var mongoose = require('mongoose');
var db = require('../config/db-config');

var userInfoSchema = mongoose.Schema({
    UserName: String,
    Password: String,
    Email: String,
});

var User = module.exports = mongoose.model('user', userInfoSchema);


