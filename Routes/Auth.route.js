const router = require('express').Router();
const createError = require('http-errors');

router.post('/register', async (req, res, next) => {
 console.log(req.body);
 // res.send('regisgter page');
 try {
  const { email, password } = req.body;
  if (!email || !password) throw createError.BadRequest();
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
