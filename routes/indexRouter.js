const express = require('express');
const router = express.Router();
const { isLoggedIn, redirectToProfile } = require('../middlewares/authMiddlewares')
const { landingPage, profileController } = require('../controllers/indexController')
router.get('/', isLoggedIn, landingPage);


router.get('/profile', isLoggedIn, profileController);

module.exports = router;