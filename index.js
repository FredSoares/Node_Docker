const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

// ROUTES
const postRouter = require("./routes/postRoutes");

const app = express();
const port = process.env.port || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(()=> console.log("Successfully connected to DB"))
        .catch((e)=> {
            console.error(e)
            setTimeout(connectWithRetry, 5000); // try connect after 5 seconds
        });    
}

connectWithRetry();

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Hello World');
});

app.use('/api/v1/posts', postRouter);

app.listen(port, ()=> {
    console.log(`Listen on port ${port}`);
});
