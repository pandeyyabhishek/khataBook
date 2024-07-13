
const { model } = require('mongoose');
const hisaabModel = require('../models/hisaab-models');
const userModels = require('../models/user-models');

module.exports.createHisaabController = async function (req, res) {

    //destructuring.
    let { title, description, userId, encrypted, shareable, editable, passcode, } = req.body;
    //encrypted, shareable, editpermissions these are boolean value in database so its logic is.
    try {
        encrypted = encrypted === 'on' ? true : false;
        shareable = shareable === 'on' ? true : false;
        editable = editable === 'on' ? true : false;
        let createdHisaab = await hisaabModel.create({
            title,
            description,
            userId: req.user._id,
            encrypted,
            shareable,
            passcode,
            editable,
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

module.exports.viewHisaabController = async function (req, res) {
    try {
        let hisaabDetails = await hisaabModel.findOne({ _id: req.params.id })

        if (!hisaabDetails)
            return res.render('invalidRoute');
        if (hisaabDetails.shareable == false) {
            const index = req.user.hisaabArray.indexOf(hisaabDetails._id);
            if (index == -1)
                return res.send(`you don't have access to view this record.`)
        }
        if (hisaabDetails.encrypted) {
            res.render('passcode', { hisaabDetails });
        } else {
            res.render('hisaab', { hisaabDetails });
        }
    } catch (err) {
        console.log(err.message);
    }

}

module.exports.passcodeController = async (req, res) => {

    let passcode = String(req.body.passcode);
    try {
        let hisaabDetails = await hisaabModel.findOne({ _id: req.params.id })
        if (!hisaabDetails)
            return res.render('invalidRoute');
        if (passcode === hisaabDetails.passcode) {
            res.render('hisaab', { hisaabDetails });
        } else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports.editHisaabPageController = async (req, res) => {
    try {
        let hisaabDetails = await hisaabModel.findOne({ _id: req.params.id })
        if (!hisaabDetails)
            return res.render('invalidRoute');
        const index = req.user.hisaabArray.indexOf(hisaabDetails._id);
        if (index == -1)
            return res.send(`you don't have access to edit this record.`)

        // console.log(hisaabDetails);
        return res.render('edit', { hisaabDetails });
    } catch (err) {
        console.log(err.message);
    }
}
module.exports.editHisaabController = async (req, res) => {
    try {
        let { title, description, userId, encrypted, shareable, editable, passcode, } = req.body;
        encrypted = encrypted === 'on' ? true : false;
        shareable = shareable === 'on' ? true : false;
        editable = editable === 'on' ? true : false;

        await hisaabModel.updateOne({ _id: req.params.id }, {
            title, description, encrypted, shareable, editable: editable, passcode,
        })

        return res.redirect('/profile');
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports.deleteHisaabController = async (req, res) => {
    try {
        let hisaabDetails = await hisaabModel.findOne({ _id: req.params.id })
        if (!hisaabDetails)
            return res.render('invalidRoute');
        const index = req.user.hisaabArray.indexOf(hisaabDetails._id);
        if (index != -1) {
            req.user.hisaabArray.splice(index, 1);
            await hisaabModel.deleteOne({ _id: req.params.id });
            await req.user.save();   //save the changes.
        } else {
            res.send('you do not have access to delete the hisaab.');
        }
        return res.redirect('/');
    } catch (err) {
        console.log(err);
    }

}