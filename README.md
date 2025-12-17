# AI SDR Dashboard

A modern, responsive AI-powered Sales Development Representative (SDR) Dashboard built with Next.js, Express.js, and TailwindCSS.

![Dashboard Preview](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Express.js](https://img.shields.io/badge/Express.js-4.18-green?style=flat-square&logo=express)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)


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

## 📄 License

MIT License - feel free to use this project for your own purposes.

