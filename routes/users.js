var jsonWebToken = require('jsonwebtoken');
var db = require('../config/db-config');
var service = require('../services/userservice');

module.exports = function (app) {

  app.get('/users', function (req, res, next) {
    service.getUsers(function (err, users) {
      if (err) {
        throw err;
      }
      res.json(users);
    });
  });


  app.post('/addUser', function (req, res) {
    var user = req.body;
    console.log(user);
    service.addUser(user, function (err, user) {
      if (err) {
        throw err;
      }
      res.json(user);
    });
  });


  app.post('/authuser', function (req, res) {
    var user;
    var response;
    service.finduser(req.body.UserName, function (err, data) {
      user = data;
      if (!user) {
        response = {
          authsuccess: false,
          description: 'User Authentication failed because user not found.'
        };
      } else if (user) {
        if (user.Password != req.body.Password) {
          response = {
            authsuccess: false,
            description: 'User Authentication failed because provided password is wrong.'
          };
        } else {
          var accessToken = jsonWebToken.sign(user.toJSON(), db.impObject.jwtSecret, {
            expiresIn: 3600 //we are setting the expiration time of 1 hr. 
          });
          response = {
            authsuccess: true,
            description: 'Sending the Access Token',
            accessToken: accessToken
          };
        }
      }
      res.json(response);
    });
  });

  app.post('/validate', function (req, res){
      console.log(jsonWebToken.verify(req.body.accessToken,db.impObject.jwtSecret));
  });
}
