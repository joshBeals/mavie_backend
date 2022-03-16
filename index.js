const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');


//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log('Connected to DB!');
});

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is up and running!!!'));