const express = require('express');
const {
	createEvent,
	getSessions,
	getSessionEvents,
	getHeatmap
} = require('../controllers/eventController');

const router = express.Router();

router.post('/events', createEvent);
router.get('/sessions', getSessions);
router.get('/events/:sessionId', getSessionEvents);
router.get('/heatmap', getHeatmap);

module.exports = router;
