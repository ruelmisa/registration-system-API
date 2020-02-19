// Core Packages
const fs = require("fs");
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// app.get("/", (req, res) => {
// 	res
// 		.status(200)
// 		.json({ message: "Hello Opal API", app: "Registration System" });
// });

// Test Data
const events = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/events.json`)
);

// Endpoints and Routes

// All Events
app.get("/api/v1/events", (req, res) => {
	res.status(200).json({
		status: "success",
		results: events.length,
		data: {
			events
		}
	});
});

// One Event
app.get("/api/v1/events/:id", (req, res) => {
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
});

app.post("/api/v1/events", (req, res) => {
	// Use Middleware here
	// console.log(req.body);
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
});

app.patch("/api/v1/events/:id", (req, res) => {
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
});

app.delete("/api/v1/events/:id", (req, res) => {
	const id = req.params.id * 1;
	const event = events.find(el => el.id === id);

	if (!event) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid event ID"
		});
	}

	// Update event here
	res.status(204).json({
		status: "success",
		data: null
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
