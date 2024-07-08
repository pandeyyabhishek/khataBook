const jwt = require('jsonwebtoken');
const userModels = require('../models/user-models');
const hisaabModel = require('../models/hisaab-models')
// const { use } = require('../routes/indexRouter');

module.exports.isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // return res.status(401).send('Access Denied. Please log in.');
        return res.redirect('/auth/login');
    }
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_KEY);
        const email = verifiedUser.email;
        let userDetails = await userModels.findOne({ email }).select('-password');
        req.user = userDetails;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};


module.exports.redirectToProfile = async (req, res, next) => {

    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_KEY);
            return res.redirect('/profile');
        }
        catch (err) {
            return next();
        }
    }
    else
        return next();
};

