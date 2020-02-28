const fs = require('fs');

// Test Data
const events = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/events.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);

    if (req.params.id * 1 > events.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid event ID'
        });
    }

    next();
};

exports.checkPostBody = (req, res, next) => {
    // Make checks on the Create Event Post Body
    if (!req.body.name || !req.body.location) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing input values'
        });
    }
    next();
};

exports.getAllEvents = (req, res) => {
    res.status(200).json({
        status: 'success',
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

    res.status(200).json({
        status: 'success',
        data: {
            event
        }
    });
};

exports.createEvent = (req, res) => {
    // Temporary
    const newId = events[events.length - 1].id + 1;
    // eslint-disable-next-line prefer-object-spread
    const newEvent = Object.assign({ id: newId }, req.body);

    events.push(newEvent);
    fs.writeFile(
        `${__dirname}/dev-data/data/events.json`,
        JSON.stringify(events),
        err => {
            if (err) {
                // DO Some error prevention here
                console.log(err);
            }

            res.status(201).json({
                status: 'success',
                data: {
                    event: newEvent
                }
            });
        }
    );
};

exports.updateEvent = (req, res) => {
    // Update event here
    res.status(200).json({
        status: 'success',
        data: {
            event: '<Updated event here>'
        }
    });
};

exports.deleteEvent = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};
