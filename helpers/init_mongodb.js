const mongoose = require('mongoose');

mongoose
 .connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
 })
 .then(() => {
  console.log('Mongodb connected.');
 })
 .catch((err) => {
  console.log(err.message);
 });

mongoose.connection.on('disconnected', () => {
 console.log('Mongoose disconnected.');
});
process.on('SIGINT', async () => {
 await mongoose.connection.close();
 process.exit(0);
});
