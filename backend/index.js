require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// DB Config Imports 

const connectDB = require('./config/dbConfig');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

// Route Imports

const taskRoute = require('./routes/TaskRoute');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/taskmanager', taskRoute);

mongoose.connection.once('open', () => {
    app.listen(process.env.PORT, () => {
        console.log("App is listening at PORT " + process.env.PORT);
    });
});