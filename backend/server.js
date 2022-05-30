const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
const colors = require('colors');
const {connectDB} = require('./config/db')

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening to port # ${port}`)
})
