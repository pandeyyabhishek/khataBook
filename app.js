const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const ejs = require('ejs')
require('dotenv').config();
const db = require('./configs/mongoose-connection');
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const hisaabRouter = require('./routes/hisaabRouter');
const authMiddleWares = require('./middlewares/authMiddlewares')
const { hisaabModel } = require('./models/hisaab-models')
const { userModel } = require('./models/user-models')
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Serve static files from the 'public' directory
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// Set the view engine to EJS
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));  //using EJS as the template engine


//forward routes starting with / to index-router

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/hisaab', hisaabRouter);
app.use('*', (req, res) => {
    return res.render('invalidRoute');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
