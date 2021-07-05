const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
    .connect("mongodb://root:myPassword@mongo:27017/?authSource=admin")
    .then(()=> console.log("Successfully connected to DB"))
    .catch((e)=> console.error(e));

const port = process.env.port || 3000;

app.get('/', (req, res) => {

    return res.send('Hello World');
});


app.listen(port, ()=> {
    console.log(`Listen on port ${port}`);
});
