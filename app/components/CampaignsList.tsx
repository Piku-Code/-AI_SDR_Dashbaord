"use client";

import { useState, useEffect } from "react";
import { Plus, RefreshCw, Target, MoreVertical, Play, Pause, Trash2 } from "lucide-react";
import { campaignApi, Campaign } from "../lib/api";
import CampaignModal from "./CampaignModal";

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  paused: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  completed: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  draft: { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" },
};

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    setError(null);
    const response = await campaignApi.getAll({ sort: "newest" });
    if (response.success && response.data) {
      setCampaigns(response.data);
    } else {
      setError(response.message || "Failed to fetch campaigns");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (data: { name: string; status: string }) => {
    const response = await campaignApi.create(data);
    if (!response.success) {
      throw new Error(response.message || "Failed to create campaign");
    }
    await fetchCampaigns();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const response = await campaignApi.update(id, { status: newStatus as Campaign["status"] });
    if (response.success) {
      setCampaigns(campaigns.map(c => 
        c.id === id ? { ...c, status: newStatus as Campaign["status"] } : c
      ));
    }
    setActiveMenu(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    const response = await campaignApi.delete(id);
    if (response.success) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
    setActiveMenu(null);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm mb-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-2">
          <Target size={18} className="text-blue-500" />
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Campaigns</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCampaigns}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={16} className={`text-gray-500 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New Campaign</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={fetchCampaigns}
            className="mt-2 text-sm text-red-700 font-medium hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !campaigns.length && (
        <div className="py-8 text-center">
          <RefreshCw className="w-6 h-6 text-gray-400 animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading campaigns...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && campaigns.length === 0 && (
        <div className="py-8 text-center">
          <Target className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-3">No campaigns yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Create your first campaign
          </button>
        </div>
      )}

      {/* Campaigns List */}
      {campaigns.length > 0 && (
        <div className="space-y-2">
          {campaigns.map((campaign) => {
            const colors = statusColors[campaign.status] || statusColors.draft;
            return (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {campaign.name}
                    </h4>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{campaign.emailsSent.toLocaleString()} sent</span>
                    <span>{campaign.replies.toLocaleString()} replies</span>
                    <span>{campaign.replyRate}% rate</span>
                  </div>
                </div>

                {/* Actions Menu */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === campaign.id ? null : campaign.id)}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>

                  {activeMenu === campaign.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 top-8 z-20 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                        {campaign.status !== "active" && (
                          <button
                            onClick={() => handleStatusChange(campaign.id, "active")}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Play size={14} />
                            Activate
                          </button>
                        )}
                        {campaign.status === "active" && (
                          <button
                            onClick={() => handleStatusChange(campaign.id, "paused")}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Pause size={14} />
                            Pause
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(campaign.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Campaign Modal */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
}

