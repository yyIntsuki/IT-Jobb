// get upm package path from node_modules.
var path = require('path');

exports.Index = function(req,res){
    res.sendFile(path.resolve('public/index.html'));
};

exports.Profile = function(req,res){
    res.sendFile(path.resolve('public/profile.html'));
};

exports.About = function(req,res){
    res.sendFile(path.resolve('public/about.html'));
};