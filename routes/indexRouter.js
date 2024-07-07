const express = require('express');
const router = express.Router();
const { isLoggedIn, redirectToProfile } = require('../middlewares/authMiddlewares')
const indexController = require('../controllers/indexController')
router.get('/', isLoggedIn, indexController.landingPage);


router.get('/profile', isLoggedIn, indexController.profileController);

module.exports = router;