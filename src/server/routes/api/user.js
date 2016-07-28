'use strict';

/** 
 * User
 */


// express server app dependencies 
var express = require('express'),
  router = express.Router(),

  // passport package for easy authentication 
  passport = require('passport'),

  // require our user model 
  User = require('../../models/user.js');

/**
 * Create 
 */
// route for user registration 
router.post('/register', function(req, res, next) {

  // register a new user 
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err) {

    // DEBUG: account var
    // console.log(account);

    // if there is an error return a bad request
    if (err) {
      return res.status(400).json({
        err: err
      });
    }

    // automagically authenticate the user
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }

      // if no user return 500 error as user should have been created
      if (!user) {
        return res.status(500).json({
          err: info
        });
      }

      // log the user in
      req.logIn(user, function(err) {
        // if error
        if (err) {
          // return 500 status and message
          return res.status(500).json({
            err: 'Could not log in user'
          });
        }

        // return 201 created user
        res.status(201).json({
          status: 'Registration & Login successful!'
        });
      });

    // self-invoke
    })(req, res, next);

  });
});


// route for logging the user into the application 
router.post('/login', function(req, res, next) {
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
          err: 'Could not log in user'
        });
      }

      res.status(200).json({
        status: 'Login successful!',
        username: user.username
      });
    });

  })(req, res, next);
});


// for logging the user out of the app 
router.get('/logout', function(req, res) {
  req.logout();
  res.sendStatus(200);
});


// check to see the user is logged in 
router.get('/status', function(req, res) {
  res.send(req.user);
});



// get all users
router.get('/', function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});


// get a single user
router.get('/:userid', function(req, res) {
  User.findById(req.params.userid, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

// update a user
router.put('/:userid', function(req, res) {
  // use our bear model to find the bear we want
  User.findById(req.params.userid, function(err, user) {

    if (err) {
      res.send(err);
    }

    user.username = req.body.username; // update the users username

    // save the user
    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });

  });
});

// delete a user
router.delete('/:userid', function(req, res) {
  User.remove({
    _id: req.params.userid
  }, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({
      message: 'Successfully deleted'
    });
  });
});

// expose the route to our app with module.exports
module.exports = router;
