var User = require('../models/user.model');

exports.logout = function(req, res){
    if(req.session){
        req.session.destroy(function (err){
           return err? next(err) : res.redirect('/')
        })
    }
}

exports.create = function(req, res) {
    //confirm relevent data
    //confirm all relevent data passed
    if (!req.body.email ||
        !req.body.username ||
        !req.body.password ||
        !req.body.passwordConf) {
        var err = new Error('Missing relevent information in request');
        err.status = 400;
        return err;
    }

    //confirm both passwords match
    if (req.body.password != req.body.passwordConf) {
        var err = new Error('Password mismatch');
        err.status = 400;
        res.send("Password mismatch");
        return err;
    }

    //set user Data object
    var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf
    }

    //Create a user
    User.create(userData, function(error, user){
        if(error) {
            return res.send(error);
        } else {
            req.session.userId = user._id;
            return res.redirect('/profile');
        }
    })
}
exports.home = function (req, res) {
    res.status = 200;
    res.body("Welcome");
    return res
}
exports.showProfile = function(req, res) {
         User.findById(req.session.userId)
        .exec(function (error, user){
            if(error){
                return error;
            }else {
                if (user === null) {
                    var err = new Error('Unauthorized');
                    err.status = 403;
                    return res.send(err);
                } else {
                    return res.send('Name: ' + user.username +
                                    ' Mail: ' + user.email);
                }
            }
        })
}