const Event = require('../models/Event');

const createEvent = async (req, res) => {
	try {
		const event = await Event.create(req.body);
		res.status(201).json(event);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getSessions = async (req, res) => {
	try {
		const sessions = await Event.aggregate([
			{
				$group: {
					_id: '$sessionId',
					eventCount: { $sum: 1 }
				}
			},
			{
				$project: {
					_id: 0,
					sessionId: '$_id',
					eventCount: 1
				}
			},
			{ $sort: { sessionId: 1 } }
		]);
		res.json(sessions);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getSessionEvents = async (req, res) => {
	try {
		const events = await Event.find({ sessionId: req.params.sessionId })
			.sort({ timestamp: 1 });
		res.json(events);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getHeatmap = async (req, res) => {
	try {
		const query = { event: 'click' };
		if (typeof req.query.url === 'string' && req.query.url.trim()) {
			query.url = req.query.url;
		}

		const events = await Event.find(query)
			.select({ _id: 0, pageX: 1, pageY: 1 });

		res.json(events.map(({ pageX, pageY }) => ({ x: pageX, y: pageY })));
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createEvent,
	getSessions,
	getSessionEvents,
	getHeatmap
};
