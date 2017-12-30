// var express = require('express');
// var router = express.Router();
// var User = require('../models/user.model');
//
// //Login route for reading data
// router.get('/login', function(req, res, next) {
//     User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
//         if (error || !user){
//             var err = new Error('Unauthorised')
//             err.status = 401;
//             return next(err);
//         } else {
//             req.session.userId = user._id;
//             return res.redirect('/profile');
//         }
//     })
// })
//
// router.post('/register', function (req, res, next) {
//
//     //confirm all relevent data passed
//     if (!req.body.email ||
//         !req.body.username ||
//         !req.body.password ||
//         !req.body.passwordConf) {
//         var err = new Error('Missing relevent information in request');
//         err.status = 400;
//         return next(err);
//     }
//
//     //confirm both passwords match
//     if (req.body.password != req.body.passwordConf) {
//         var err = new Error('Password mismatch');
//         err.status = 400;
//         res.send("Password mismatch");
//         return next(err);
//     }
//
//     //set user Data object
//     var userData = {
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password,
//         passwordConf: req.body.passwordConf
//     }
//
//     //Create a user
//     User.create(userData, function(error, user){
//         if(error) {
//             return next(error)
//         } else {
//             req.session.userId = user._id;
//             return res.redirect('/profile');
//         }
//     })
// });
//
// router.get('/profile', function (req, res, next){
//     User.findById(req.session.userId)
//         .exec(function (error, user){
//             if(error){
//                 return next(error)
//             }else {
//                 if (user === null) {
//                     var err = new Error('Unauthorized');
//                     err.status = 403;
//                     return next(err);
//                 } else {
//                     return res.send('Name: ' + user.username +
//                                     ' Mail: ' + user.email);
//                 }
//             }
//         })
// })

//
// module.exports = router;
module.exports = function(app) {
    var usercontroller = require('../controllers/user.controller')
    app.get('/home', usercontroller.home)
    app.get('/logout', usercontroller.logout);
    //app.post('/create', usercontroller.create);
    app.get('/profile', usercontroller.showProfile)
}