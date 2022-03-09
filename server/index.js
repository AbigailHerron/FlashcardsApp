const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// dot env package
require('dotenv').config();
const PORT = process.env.PORT;

<<<<<<< HEAD
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
=======
/* var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}; */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies]
>>>>>>> 08b1042 (images fully working)
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
/* app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}); */
const userRouter = require('./routes/userRoutes');
const imageUploadRouter = require('./routes/imageUpload');
app.use('/user', userRouter);
app.use('/image', imageUploadRouter);

app.listen(PORT);
console.log('server connected');
