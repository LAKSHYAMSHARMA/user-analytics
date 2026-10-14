# User Analytics Platform

A full-stack analytics application that tracks activity on a storefront demo and presents sessions and click heatmaps in a React dashboard.

## Live Links

| Service | Link |
| --- | --- |
| Dashboard frontend | `https://user-analytics-gamma.vercel.app` |
| Demo storefront | `https://user-analytics-demo-site.vercel.app` |
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
