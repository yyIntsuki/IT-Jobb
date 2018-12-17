var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var UserSchema = new Schema({
    uname: {type: String, required: true, max: 200},
    psw: {type: String, required: true, max: 200},
    email: {type: String, required: true, max: 200}
});

module.exports = mongoose.model('User', UserSchema);