const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

// dot env package
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
}

const userRouter = require('./routes/userRoutes');
const imageRouter = require('./routes/imageRoutes');
const publickRouter = require('./routes/publicRoutes');
app.use('/user', userRouter);
app.use('/image', imageRouter);
app.use('', publickRouter);

app.listen(PORT);
