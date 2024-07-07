const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URI)
    .then(function () {
        console.log("connted to database.")
    }).catch((err) => {
        console.log(err)
    })

const db = mongoose.connection;

module.exports = db;