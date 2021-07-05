const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

const app = express();
const port = process.env.port || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(()=> console.log("Successfully connected to DB"))
    .catch((e)=> console.error(e));

app.get('/', (req, res) => {
    return res.send('Hello World');
});


app.listen(port, ()=> {
    console.log(`Listen on port ${port}`);
});
