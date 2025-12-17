const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  emailsSent: number;
  replies: number;
  meetings: number;
  replyRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalEmailsSent: number;
  totalReplies: number;
  totalMeetings: number;
  averageReplyRate: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  messages?: string[];
  total?: number;
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Request failed',
        message: data.message || 'An error occurred',
        messages: data.messages,
      };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Network error',
      message: 'Failed to connect to the server. Please ensure the backend is running.',
    };
  }
}

// Campaign API functions
export const campaignApi = {
  // Get all campaigns
  getAll: async (params?: { status?: string; sort?: string; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const query = searchParams.toString();
    return fetchApi<Campaign[]>(`/campaigns${query ? `?${query}` : ''}`);
  },

  // Get single campaign
  getById: async (id: string) => {
    return fetchApi<Campaign>(`/campaigns/${id}`);
  },

  // Create new campaign
  create: async (campaign: { name: string; status?: string }) => {
    return fetchApi<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    });
  },

  // Update campaign
  update: async (id: string, updates: Partial<Campaign>) => {
    return fetchApi<Campaign>(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete campaign
  delete: async (id: string) => {
    return fetchApi<Campaign>(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  },
};

// Stats API functions
export const statsApi = {
  // Get dashboard statistics
  getStats: async () => {
    return fetchApi<DashboardStats>('/stats');
  },

  // Health check
  healthCheck: async () => {
    return fetchApi<{ message: string; timestamp: string }>('/health');
  },
};

