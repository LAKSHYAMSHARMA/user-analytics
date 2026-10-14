# User Analytics Platform

A full-stack analytics application that tracks activity on a storefront demo and presents sessions and click heatmaps in a React dashboard.

## Live Links

| Service | Link |
| --- | --- |
| Dashboard frontend | [user-analytics-gamma.vercel.app](https://user-analytics-gamma.vercel.app) |
| Demo storefront | [user-analytics-demo-site.vercel.app](https://user-analytics-demo-site.vercel.app) |
| Backend API | [user-analytics-backend-7m1e.onrender.com](https://user-analytics-backend-7m1e.onrender.com) |
| Backend health check | [Open health check](https://user-analytics-backend-7m1e.onrender.com/health) |
| Source repository | [github.com/LAKSHYAMSHARMA/user-analytics](https://github.com/LAKSHYAMSHARMA/user-analytics) |

## How It Works

1. The demo storefront loads `config.js` and `tracker.js`.
2. The tracker sends page views and click coordinates to the Render API.
3. The Express backend stores events in MongoDB Atlas.
4. The Vercel dashboard reads sessions and click coordinates from the same API.

## Features

- Automatic page view tracking
- Global click tracking with page coordinates
- Session grouping and event counts
- Session journey timeline
- Automatic click heatmap
- Responsive dashboard layout
- Production API configuration through environment variables

## Tech Stack

- React and Vite
- React Router
- Axios
- Node.js and Express
- MongoDB and Mongoose
- Vercel for frontend deployments
- Render for the backend deployment
- MongoDB Atlas for hosted storage

## Project Structure

```text
user-analytics/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── db.js
│   │   └── server.js
│   └── package.json
├── dashboard/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── demo-site/
│   ├── config.js
│   ├── index.html
│   ├── style.css
│   └── tracker.js
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/events` | Store an analytics event |
| `GET` | `/api/sessions` | Return sessions and event counts |
| `GET` | `/api/events/:sessionId` | Return a session timeline |
| `GET` | `/api/heatmap` | Return all click coordinates |
| `GET` | `/api/heatmap?url=...` | Filter click coordinates by page URL |
| `GET` | `/health` | Check backend availability |

## Local Setup

### Backend

```powershell
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Start the API:

```powershell
node src/server.js
```

MongoDB Atlas must allow the machine or deployment IP address in **Network Access**.

### Dashboard

```powershell
cd dashboard
npm install
```

Create `dashboard/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start the dashboard:

```powershell
npm run dev
```

For Vercel, set `VITE_API_URL` to:

```text
https://user-analytics-backend-7m1e.onrender.com
```

Set the Vercel project root directory to `dashboard`. The `dashboard/vercel.json` rewrite serves `index.html` for client-side routes such as `/sessions` and `/heatmap`.

For Render, set `FRONTEND_ORIGINS` to:

```text
https://user-analytics-gamma.vercel.app,https://user-analytics-demo-site.vercel.app
```

The backend accepts analytics events at:

```text
POST https://user-analytics-backend-7m1e.onrender.com/api/events
```

### Demo Storefront

The static demo uses `demo-site/config.js` to point its tracker at the backend:

```js
window.DEMO_API_URL = 'https://user-analytics-backend-7m1e.onrender.com';
```

Serve `demo-site` with any static web server and open `index.html` in the browser. The demo sends events automatically when the page loads and when users click anywhere on the page.

## Validation

```powershell
cd dashboard
npm run lint
npm run build
```
