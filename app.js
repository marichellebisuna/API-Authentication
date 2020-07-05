const express = require('express');
const morgan = require('morgan');
const createErrors = require('http-errors');
require('dotenv').config();

const AuthRoute = require('./Routes/Auth.route');

const app = express();
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
 res.send('hello from express');
});
app.use('/auth', AuthRoute);

//creating error
app.use(async (req, res, next) => {
 next(createErrors.NotFound('Page cannot be found.'));
});
//handling error
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
