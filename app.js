const express = require('express');
const morgan = require('morgan');
const createErrors = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./Routes/Auth.route'));

//handling CORS
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
 );
 if (req.method === 'OPTIONS') {
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  return res.status(200).json({});
 }
});

//handling errors
app.use(async (req, res, next) => {
 next(createErrors.NotFound('Page cannot be found.'));
});

app.use((err, req, res, next) => {
 res.status(err.status || 500);
 res.send({
  error: {
   status: err.status || 500,
   message: err.message,
  },
 });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
 console.log(`Server running at port ${PORT}.`);
});
