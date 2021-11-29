const express = require('express');
const cors = require('cors');

// dot env package
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(cors());

const userRouter = require('./routes/userRoutes');
const deckRouter = require('./routes/deckRoutes');
app.use('/user', userRouter);
app.use('/user/decks', deckRouter);

app.listen(PORT);
console.log('server connected');
