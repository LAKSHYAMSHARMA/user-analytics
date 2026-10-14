require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const allowedOrigins = (process.env.FRONTEND_ORIGINS ||
  'https://user-analytics-gamma.vercel.app,https://user-analytics-demo-site.vercel.app,http://localhost:5173,http://localhost:5500,http://127.0.0.1:5500')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use('/api', eventRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
};

startServer();