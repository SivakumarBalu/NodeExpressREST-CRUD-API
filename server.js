require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const SubcriberRoute = require('./routes/subscriber');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));
const app = express();

app.use(express.json());
app.use('/sub', SubcriberRoute);

app.listen(3002, () => console.log('app server started'));
