const router = require('express').Router();
const createError = require('http-errors');
const User = require('../Models/User.model');

router.post('/register', async (req, res, next) => {
 console.log(req.body);
 // res.send('regisgter page');
 try {
  const { email, password } = req.body;
  if (!email || !password) throw createError.BadRequest();

  const doesExist = await User.findOne({ email });
  if (doesExist) throw createError.Conflict(`${email} is already taken.`);

  const user = new User({ email, password });
  const savedUser = await user.save();
  res.send(savedUser);
 } catch (error) {
  next(error);
 }
});
router.post('/login', async (req, res, next) => {
 res.send('login route');
});
router.post('/refresh-token', async (req, res, next) => {
 res.send('refresh-token route');
});
router.delete('/logout', async (req, res, next) => {
 res.send('logout route');
});

module.exports = router;
