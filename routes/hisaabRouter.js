
const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/authMiddlewares');
const { viewHisaabPageController,
    createHisaabController,
    deleteHisaabController, viewHisaabController,
    passcodeController, editHisaabPageController, editHisaabController } = require('../controllers/hisaabController');


router.post('/create', isLoggedIn, createHisaabController);
router.post('/view/:id/verified', isLoggedIn, passcodeController);
router.post('/edit/:id', isLoggedIn, editHisaabController);
router.get('/create', isLoggedIn, viewHisaabPageController);
router.get('/view/:id', isLoggedIn, viewHisaabController);
router.get('/edit/:id', isLoggedIn, editHisaabPageController);
router.get('/delete/:id', isLoggedIn, deleteHisaabController);

module.exports = router;



