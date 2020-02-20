const express = require("express");
const eventController = require("./../controllers/eventController");

// const {
// 	getAllEvents,
// 	getEvent,
// 	createEvent,
// 	updateEvent,
// 	deleteEvent
// } = eventController;

const router = express.Router();

router
	.route("/")
	.get(eventController.getAllEvents)
	.post(eventController.createEvent);

router
	.route("/:id")
	.get(eventController.getEvent)
	.patch(eventController.updateEvent)
	.delete(eventController.deleteEvent);

module.exports = router;
