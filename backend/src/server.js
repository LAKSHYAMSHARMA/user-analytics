require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
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