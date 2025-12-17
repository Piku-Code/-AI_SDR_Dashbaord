import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import Charts from "./components/Charts";
import AIActivityStream from "./components/AIActivityStream";
import AIInsights from "./components/AIInsights";
import RecentActivity from "./components/RecentActivity";
import UsageFooter from "./components/UsageFooter";
import CampaignsList from "./components/CampaignsList";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f0f7ff]">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-[140px] overflow-x-hidden min-h-screen">
        <div className="p-3 sm:p-4 md:p-6 lg:p-7 max-w-6xl mx-auto pb-6">
          <Header />
          <StatsCards />
          <Charts />
          <CampaignsList />
          <AIActivityStream />
          <AIInsights />
          <RecentActivity />
          <UsageFooter />
        </div>
      </main>
    </div>
  );
}
