const userModels = require("../models/user-models");
const { options } = require("../routes/indexRouter");

module.exports.landingPage = (req, res) => {
    // console.log(req.user, "check");
    // const user = req.user;
    return res.redirect('/profile')
}

module.exports.profileController = async (req, res) => {
    let byDate = Number(req.query.byDate);
    let { startDate, endDate } = req.query;
    byDate = byDate ? byDate : -1;
    startDate = startDate ? startDate : new Date("2003-12-18");
    endDate = endDate ? endDate : new Date();
    const user = await userModels.findOne({ email: req.user.email })
        .populate({
            path: 'hisaabArray',
            match: {
                createdAt: { $gte: startDate, $lte: endDate },
            },
            options: {
                sort: { createdAt: byDate },
            }
        });
    return res.render('profile', { user });
}