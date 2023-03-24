const express = require('express');

const connect = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log('Server started on port ' + PORT);
    await connect();
    console.log('MongoDB connected');
});