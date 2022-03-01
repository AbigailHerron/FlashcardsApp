const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// dot env package
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const userRouter = require('./routes/userRoutes');
const imageUploadRouter = require('./routes/imageUpload');
app.use('/user', userRouter);
app.use('/image', imageUploadRouter);

app.listen(PORT);
console.log('server connected');
