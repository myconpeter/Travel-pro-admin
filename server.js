

const bodyParser = require('body-parser');
const express = require('express');

const app     = express();

const mongoose= require('mongoose');
const passport = require ('passport');
const methodOverride = require("method-override");
const session = require('express-session');
const flash = require("connect-flash");
const dotenv = require('dotenv')



dotenv.config()
const PORT  = process.env.PORT;

const indexRoutes = require("./routes/indexRoute");
const adminRoutes = require("./routes/admin");
const createPlaneTicket = require("./routes/createPlaneTicket")
const createShipTicket = require("./routes/createShipTicket")
const createConfirm = require('./routes/createConfirm')

//passport config:
require('./config/passport');




//EJS
app.set('view engine','ejs');
//app.use(expressEjsLayout);

// POASSPORT CONFIGURATION
 app.use(session({
    secret : 'micheal',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })

app.use(bodyParser.urlencoded({extended: true}));

 app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    currentAdmin = req.user;
    next();
});

app.use(methodOverride("_method"));

// routes
app.use(indexRoutes);
app.use(adminRoutes)
app.use(createPlaneTicket)
app.use(createConfirm)
app.use(createShipTicket)


let mongoURL = ''

if (process.env.NODE_ENV === 'production') {
    mongoURL = process.env.MONGO_URI_PROD
    console.log('Running in Production environment');
} else if (process.env.NODE_ENV === 'local') {
    mongoURL = process.env.MONGO_URI_LOCAL
    console.log('Running in local environment');
    
} else {
    console.log('ENVIRONMENT NOT SET CORRECTLY, PLEASE CHECK')

}

// MONGOOSE CONNECTION
mongoose.connect(mongoURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`connected to port: ${PORT} and dataBase ${mongoURL}`)
        })

    })
    .catch(err => console.log('err'))

