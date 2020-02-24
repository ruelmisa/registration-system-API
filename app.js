// Core Packages
const express = require("express");
const morgan = require("morgan");

// Custom Modules
const eventRouter = require("./routes/eventRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public/`));
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
