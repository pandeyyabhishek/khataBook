const express = require('express');
const router = express.Router();

const { registerController, loginController } = require('../controllers/auth-controller');
const { isLoggedIn, redirectToProfile } = require('../middlewares/authMiddlewares')
router.get('/', (req, res) => {
  res.send("auth");
})

router.get('/register', redirectToProfile, (req, res) => {
  res.render('register');
})

router.get('/login', redirectToProfile, (req, res) => {
  res.render('login', { loggedIn: false });
})

router.get('/logout', (req, res) => {
  res.cookie('token', '');
  return res.redirect('/auth/login');
})
router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;