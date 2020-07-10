const express = require('express');
const morgan = require('morgan');
const createErrors = require('http-errors');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(
 cors({
  origin: 'http://localhost:8000',
 })
);
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
 next();
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

module.exports = app;
