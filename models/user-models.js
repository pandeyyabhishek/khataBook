
const mongoose = require('mongoose');

//mongoose.connect database create krta h.(but is tarah se crete nhi krte hum , we create database in config.)
// mongoose.connect('mongodb://localhost:27017/khataBook');

//models hota h document 
// schema hota h document ka blue print.

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    profilePicture: String,
    username: String,
    email: String,
    password: {
        type: String,
        select: false,
    },
    hisaabArray: [{ type: mongoose.Schema.ObjectId, ref: 'hisaab' }],
})

module.exports = mongoose.model('user', userSchema);