//var db = require('../config/db-config');
var User =  require('../models/user');

module.exports.getUsers = function (callback, limit) {
    User.find(callback).limit(limit);
}

module.exports.addUser = function (user, callback) {
    console.log('add it..');
    User.create(user, callback);
}

module.exports.finduser = function (username, callback) {
    User.findOne({ UserName: username }, callback);
}


