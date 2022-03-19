const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');


//Import Routes
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/notes');
const weightRoute = require('./routes/weights');
const verifyToken = require('./middlewares/verifyToken');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log('DB Connection Successful!'))
.catch((err) => console.log(err));

//Middlewares
app.use(express.json());
app.use(cors());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/note', verifyToken, noteRoute);
app.use('/api/weight', verifyToken, weightRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is up and running!!!'));