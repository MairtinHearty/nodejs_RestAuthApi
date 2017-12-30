var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
require('./app/routes/router.js')(app);

//connect to Mongo
mongoose.connect('mongodb://localhost:27017/rest-auth-api');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});

//session for tracking logins
app.use(session({
    secret: 'whatever',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//include routes
app.get('/', function(req, res){
    res.json({"message":"Welcome to simple home page."});
});

//catch 404 and forward to error handler
app.use(function (req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//error handler
//define as the last app.use callback
app.use(function (err, req, res, next){
    res.status = err.status || 500;
    res.send(err.message);
})

//listen on port 3000
app.listen(3000, function(){
    console.log('App listening on port 3000')
})