require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', eventRoutes);

connectDB();

const mongoose = require('mongoose');
mongoose.connection.once('open', async () => {
  await mongoose.connection.db.dropDatabase();
  console.log('Database cleared');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});