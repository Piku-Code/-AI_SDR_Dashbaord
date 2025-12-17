const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'campaigns.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file with dummy data if it doesn't exist
const initializeData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      campaigns: [
        {
          id: uuidv4(),
          name: "SaaS Outreach Q1",
          status: "active",
          emailsSent: 2500,
          replies: 312,
          meetings: 45,
          replyRate: 12.5,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: "Healthcare Connect",
          status: "active",
          emailsSent: 1800,
          replies: 198,
          meetings: 28,
          replyRate: 11.0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: "Tech Startup Series",
          status: "paused",
          emailsSent: 3200,
          replies: 420,
          meetings: 62,
          replyRate: 13.1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: "Enterprise Demo v2",
          status: "completed",
          emailsSent: 950,
          replies: 142,
          meetings: 23,
          replyRate: 14.9,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

// Load initial data
let data = initializeData();

// Helper function to save data
const saveData = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Validation middleware
const validateCampaign = (req, res, next) => {
  const { name, status } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Campaign name is required and must be a non-empty string');
  }

  if (name && name.length > 100) {
    errors.push('Campaign name must be less than 100 characters');
  }

  const validStatuses = ['active', 'paused', 'completed', 'draft'];
  if (status && !validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      messages: errors
    });
  }

  next();
};

// ==================== API ROUTES ====================

// GET /api/campaigns - Get all campaigns
app.get('/api/campaigns', (req, res) => {
  try {
    const { status, sort, limit } = req.query;
    
    let campaigns = [...data.campaigns];

    // Filter by status if provided
    if (status) {
      campaigns = campaigns.filter(c => c.status === status);
    }

    // Sort campaigns
    if (sort === 'newest') {
      campaigns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'oldest') {
      campaigns.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'name') {
      campaigns.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'replyRate') {
      campaigns.sort((a, b) => b.replyRate - a.replyRate);
    }

    // Limit results
    if (limit && !isNaN(parseInt(limit))) {
      campaigns = campaigns.slice(0, parseInt(limit));
    }

    res.json({
      success: true,
      data: campaigns,
      total: campaigns.length
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch campaigns'
    });
  }
});

// GET /api/campaigns/:id - Get single campaign
app.get('/api/campaigns/:id', (req, res) => {
  try {
    const campaign = data.campaigns.find(c => c.id === req.params.id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Campaign not found'
      });
    }

    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch campaign'
    });
  }
});

// POST /api/campaigns - Create new campaign
app.post('/api/campaigns', validateCampaign, (req, res) => {
  try {
    const { name, status = 'draft' } = req.body;

    const newCampaign = {
      id: uuidv4(),
      name: name.trim(),
      status,
      emailsSent: 0,
      replies: 0,
      meetings: 0,
      replyRate: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.campaigns.push(newCampaign);
    saveData();

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: newCampaign
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to create campaign'
    });
  }
});

// PUT /api/campaigns/:id - Update campaign
app.put('/api/campaigns/:id', (req, res) => {
  try {
    const index = data.campaigns.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Campaign not found'
      });
    }

    const { name, status, emailsSent, replies, meetings } = req.body;
    const campaign = data.campaigns[index];

    // Update fields if provided
    if (name) campaign.name = name.trim();
    if (status) campaign.status = status;
    if (emailsSent !== undefined) campaign.emailsSent = emailsSent;
    if (replies !== undefined) campaign.replies = replies;
    if (meetings !== undefined) campaign.meetings = meetings;
    
    // Recalculate reply rate
    if (campaign.emailsSent > 0) {
      campaign.replyRate = parseFloat(((campaign.replies / campaign.emailsSent) * 100).toFixed(1));
    }
    
    campaign.updatedAt = new Date().toISOString();

    data.campaigns[index] = campaign;
    saveData();

    res.json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign
    });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to update campaign'
    });
  }
});

// DELETE /api/campaigns/:id - Delete campaign
app.delete('/api/campaigns/:id', (req, res) => {
  try {
    const index = data.campaigns.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Campaign not found'
      });
    }

    const deleted = data.campaigns.splice(index, 1)[0];
    saveData();

    res.json({
      success: true,
      message: 'Campaign deleted successfully',
      data: deleted
    });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to delete campaign'
    });
  }
});

// GET /api/stats - Get dashboard statistics
app.get('/api/stats', (req, res) => {
  try {
    const campaigns = data.campaigns;
    
    const stats = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      totalEmailsSent: campaigns.reduce((sum, c) => sum + c.emailsSent, 0),
      totalReplies: campaigns.reduce((sum, c) => sum + c.replies, 0),
      totalMeetings: campaigns.reduce((sum, c) => sum + c.meetings, 0),
      averageReplyRate: campaigns.length > 0 
        ? parseFloat((campaigns.reduce((sum, c) => sum + c.replyRate, 0) / campaigns.length).toFixed(1))
        : 0
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch statistics'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Dashboard API Server running!
   
   Local:    http://localhost:${PORT}
   
   Endpoints:
   - GET    /api/campaigns      - Get all campaigns
   - GET    /api/campaigns/:id  - Get single campaign
   - POST   /api/campaigns      - Create campaign
   - PUT    /api/campaigns/:id  - Update campaign
   - DELETE /api/campaigns/:id  - Delete campaign
   - GET    /api/stats          - Get dashboard stats
   - GET    /api/health         - Health check
  `);
});

