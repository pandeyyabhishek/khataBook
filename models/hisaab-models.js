
const mongoose = require('mongoose');

//models hota h document 
// schema hota h document ka blue print.

const hisaab = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId, ref: 'user',
        required: true,
    },
    encrypted: {
        type: Boolean,
        default: false,
    },
    editable: {
        type: Boolean,
        default: false,
    },
    shareable: {
        type: Boolean,
        default: false,
    },
    passcode: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('hisaab', hisaab);