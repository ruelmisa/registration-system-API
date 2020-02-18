// Core Packages
const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res
		.status(200)
		.json({ message: "Hello Opal API", app: "Registration System" });
});

app.post("/", (req, res) => {
	res.status(201).send("POST HERE");
});

const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
