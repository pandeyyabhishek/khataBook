const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to the database.");
    }
    catch (err) {
        console.log("Error connecting to the database:", err);
    }
}

connectDb();

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connection established successfully.');
});

module.exports = db;