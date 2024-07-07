
const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/authMiddlewares');
const { viewHisaabPageController, createHisaabController } = require('../controllers/hisaabController');


router.post('/create', isLoggedIn, createHisaabController);
router.get('/create', isLoggedIn, viewHisaabPageController);


module.exports = router;



