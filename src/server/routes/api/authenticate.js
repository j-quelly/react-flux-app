'use strict';

/** 
 * API ROOT
 */

// express server app dependencies 
var express = require('express'),
  router = express.Router(),

  // passport package for easy authentication 
  passport = require('passport'),

  // require our user model 
  User = require('../../models/user.js');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var creds = require('../../../../creds.json');

// authenticate API user
router.post('/authenticate', function(req, res, next) {

  // authenticate
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    // if no user return 500 error 
    if (!user) {
      return res.status(500).json({
        err: info
      });
    }

    // log the user in 
    req.logIn(user, function(err) {
      if (err) {
        return res.status(401).json({
          err: 'Could not authenticate user'
        });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, creds.secret, {
          expiresIn: 1440 // expires in 24 hours
        });

        res.status(200).json({
          status: 'Login successful!',
          username: user.username,
          token: token
        });
      }

    });

  })(req, res, next);

});

// expose the route to our app with module.exports
module.exports = router;
