const cors = require('cors');
const express = require('express');
const app = express();
const apiRouter = require('./src/routes/api');

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use('/api', apiRouter);

module.exports = app;