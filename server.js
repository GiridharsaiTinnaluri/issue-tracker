// import libraries
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');

// import modules
const MDBConnection = require('./config/dbConnection');
const routes = require('./routes');
const flashMW = require('./config/flashMiddlewarre');

//config express
const app = express();
const PORT = 5000;

// Giving access to the public assets folder
app.use(express.static('./assests'));
app.use(expressLayouts);
//extract styles and scripts from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// parsing request body
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


// setting view templates - ejs.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name: 'issueTracker',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}));

// flash midleware used to set flash messages to cookies 
app.use(flash());
app.use(flashMW.setFlash);

//configuring Routes
app.use('/', routes);

// connecting to mongodb and listening to the server.
MDBConnection().then(() => {
    app.listen(PORT, (err) => {
        if(err) {
            console.log(err);
        }
    
        console.log('Running Server On PORT : ', PORT);
    })
}).catch((err) => {
    console.log(err);
})
