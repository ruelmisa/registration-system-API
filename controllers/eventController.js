const fs = require("fs");

// Test Data
const events = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/events.json`)
);

exports.getAllEvents = (req, res) => {
	res.status(200).json({
		status: "success",
		requestedAt: req.requestTime,
		results: events.length,
		data: {
			events
		}
	});
};

exports.getEvent = (req, res) => {
	const id = req.params.id * 1;

	const event = events.find(el => el.id === id);

	if (!event) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid event ID"
		});
	}

	res.status(200).json({
		status: "success",
		data: {
			events
		}
	});
};

exports.createEvent = (req, res) => {
	// Temporary
	const newId = events[events.length - 1].id + 1;
	const newEvent = Object.assign({ id: newId }, req.body);

	events.push(newEvent);
	fs.writeFile(
		`${__dirname}/dev-data/data/events.json`,
		JSON.stringify(events),
		err => {
			res.status(201).json({
				status: "success",
				data: {
					event: newEvent
				}
			});
		}
	);
};

exports.updateEvent = (req, res) => {
	const id = req.params.id * 1;
	console.log(req.body);
	const event = events.find(el => el.id === id);

	if (!event) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid event ID"
		});
	}

	// Update event here
	res.status(200).json({
		status: "success",
		data: {
			event: "<Updated event here>"
		}
	});
};

exports.deleteEvent = (req, res) => {
	const id = req.params.id * 1;
	const event = events.find(el => el.id === id);

	if (!event) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid event ID"
		});
	}

	res.status(204).json({
		status: "success",
		data: null
	});
};
