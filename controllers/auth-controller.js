const userModels = require("../models/user-models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

module.exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await userModels.findOne({ email }).select('+password');
        if (user) {

            await bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    let payload = {
                        _id: user._id,
                        email: user.email,
                    }
                    let token = jwt.sign(payload, process.env.JWT_KEY);
                    res.cookie('token', token);
                    return res.redirect('/profile')
                    return res.send('logged in.');
                }
                else
                    return res.send('invalid credentials');
            });
        }
        else
            return res.redirect('/auth/register');
    }
    catch (err) {
        return err.message;
    }
}

module.exports.registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let check = await userModels.findOne({ email });

        if (check) {
            // return res.send("Email is already registered.");
            return res.redirect('/');
        }

        // Encrypt the password using the bcrypt npm package
        const salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);

        // Create user object
        let user = { email, password: hashed, name };

        // Save user to the database
        const newUser = await userModels.create(user);

        // Generate JWT token with the saved user's _id
        let payload = {
            _id: newUser._id,
            email: newUser.email,
        };
        let token = jwt.sign(payload, process.env.JWT_KEY);

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true, secure: true }); // Secure true for HTTPS

        // Redirect to the homepage
        return res.redirect('/');
    } catch (err) {
        return res.send(err.message);
    }
};

