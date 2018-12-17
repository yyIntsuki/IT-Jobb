var User = require('../models/login.models');

exports.User = function(req, res){
    var user = new User({
        uname: req.body.uname,
        psw: req.body.psw,
        email: req.body.email
    });

    user.save(function(error){
        if (error){
            return next(error);
        }
        res.send('User created');
    });
};

exports.list = function(req, res){
    User.find(function(err, user){
        if (err){
            return next(err);  
        } 
        res.send(user);
    });
};

exports.login = function(req, res){
    User.findById(req.params.id, function(err, user){
        if (err){
            return next(err);
        }
        res.send(user);
    });
};