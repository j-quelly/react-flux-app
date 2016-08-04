'use strict';

/** 
 * API ROOT
 */

// express server app dependencies 
var express = require('express'),
  router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: 'Welcome to the coolest API on earth!'
  });
});

// expose the route to our app with module.exports
module.exports = router;
