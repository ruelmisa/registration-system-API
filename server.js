// Starting File where Everything Starts!!!
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Necessary to read our .env file
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('DB Connection Successful');
    });

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field.']
    },
    location: {
        type: String,
        required: [true, 'Location is a required field.']
    },
    city: {
        type: String,
        required: [true, 'City is a required field.']
    },
    province: {
        type: String,
        required: [true, 'Province is a required field.']
    },
    country: {
        type: String,
        default: 'United States',
        required: [true, 'Country is a required field.']
    },
    postalCode: {
        type: Number,
        required: [true, 'Postal Code is a required field.']
    }
});

const Event = mongoose.model('Event', eventSchema);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
