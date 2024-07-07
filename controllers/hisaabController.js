
const hisaabModel = require('../models/hisaab-models');

module.exports.createHisaabController = async function (req, res) {

    //destructuring.
    let { title, description, userId, encrypted, shareable, editpermissions, passcode, } = req.body;
    //encrypted, shareable, editpermissions these are boolean value in database so its logic is.
    try {
        encrypted = encrypted === 'on' ? true : false;
        shareable = shareable === 'on' ? true : false;
        editpermissions = editpermissions === 'on' ? true : false;
        let createdHisaab = await hisaabModel.create({
            title,
            description,
            userId: req.user._id,
            encrypted,
            shareable,
            passcode,
            editpermissions,
        })
        // console.log(req.user.hisaabArray);
        req.user.hisaabArray.push(createdHisaab._id);
        await req.user.save();   //save the changes.
        return res.redirect('/profile');

    } catch (err) {
        return err.message;
    }
}

module.exports.viewHisaabPageController = async function (req, res) {
    return res.render('create');
}