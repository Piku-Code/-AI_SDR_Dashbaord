# AI SDR Dashboard

A modern, responsive AI-powered Sales Development Representative (SDR) Dashboard built with Next.js, Express.js, and TailwindCSS.

![Dashboard Preview](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Express.js](https://img.shields.io/badge/Express.js-4.18-green?style=flat-square&logo=express)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)

## 🚀 Features

### Frontend (Section A - 70%)
- ✅ Responsive dashboard layout with sidebar navigation
- ✅ Stats cards with real-time metrics (Emails Sent, Replies, Meetings, Reply Rate)
- ✅ Interactive charts (Engagement Over Time, Top Performing Playbooks)
- ✅ AI Activity Stream with live updates
- ✅ AI Insights & Suggestions panel
- ✅ Recent Activity feed
- ✅ Usage footer with progress bar
- ✅ Mobile-first responsive design

### Backend Integration (Section B - 20%)
- ✅ Express.js REST API
- ✅ GET /api/campaigns - Fetch all campaigns with filtering & sorting
- ✅ POST /api/campaigns - Create new campaigns
- ✅ PUT /api/campaigns/:id - Update campaigns
- ✅ DELETE /api/campaigns/:id - Delete campaigns
- ✅ GET /api/stats - Dashboard statistics
- ✅ CORS configuration
- ✅ Input validation & error handling
- ✅ JSON file-based data persistence

### Landing Page Hero (Section C - 10%)
- ✅ Modern tech company landing page
- ✅ Animated gradient background with mouse tracking
- ✅ Floating particle effects
- ✅ Smooth scroll transitions
- ✅ Feature cards with hover effects
- ✅ CTA sections with animations
- ✅ Fully responsive design

## 📁 Project Structure

```
dashboard/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   │   ├── AIActivityStream.tsx
│   │   ├── AIInsights.tsx
│   │   ├── CampaignModal.tsx
│   │   ├── CampaignsList.tsx
│   │   ├── Charts.tsx
│   │   ├── Header.tsx
│   │   ├── RecentActivity.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatsCards.tsx
│   │   └── UsageFooter.tsx
│   ├── landing/           # Landing page route
│   │   └── page.tsx
│   ├── lib/               # Utilities
│   │   └── api.ts         # API client
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard page
├── backend/               # Express.js API
│   ├── data/
│   │   └── campaigns.json # Data storage
│   ├── server.js          # API server
│   └── package.json
├── public/                # Static assets
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd dashboard
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Start the Backend Server
```bash
cd backend
npm run dev
```
The API server will run at `http://localhost:3001`

### 5. Start the Frontend (in a new terminal)
```bash
npm run dev
```
The frontend will run at `http://localhost:3000`

## 📡 API Endpoints

### Campaigns

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/campaigns` | Get all campaigns |
| GET | `/api/campaigns/:id` | Get single campaign |
| POST | `/api/campaigns` | Create campaign |
| PUT | `/api/campaigns/:id` | Update campaign |
| DELETE | `/api/campaigns/:id` | Delete campaign |

### Query Parameters (GET /api/campaigns)
- `status` - Filter by status (active, paused, completed, draft)
- `sort` - Sort by (newest, oldest, name, replyRate)
- `limit` - Limit results count

### Other Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Dashboard statistics |
| GET | `/api/health` | Health check |

### Example API Usage

```javascript
// Create a new campaign
fetch('http://localhost:3001/api/campaigns', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Q1 Outreach',
    status: 'active'
  })
})

// Get all active campaigns sorted by reply rate
fetch('http://localhost:3001/api/campaigns?status=active&sort=replyRate')
```

## 🎨 Pages

| Route | Description |
|-------|-------------|
| `/` | Main Dashboard |
| `/landing` | Landing Page Hero |

## 🔧 Technologies Used

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS 4** - Utility-first CSS
- **Recharts** - Chart library
- **Lucide React** - Icon library

### Backend
- **Express.js** - Node.js web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique ID generation

## 📱 Responsive Design

The dashboard is fully responsive across all device sizes:
- **Mobile** (< 640px) - Single column layout, collapsible sidebar
- **Tablet** (640px - 1024px) - Two column grids, compact spacing
- **Desktop** (> 1024px) - Full layout with sidebar

## 🌐 Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📝 Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start with auto-reload
npm run start    # Start production server
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Render/Railway)
1. Push backend folder to GitHub
2. Create new Web Service
3. Set start command: `npm start`
4. Deploy

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ for the AI SDR Dashboard Assessment
