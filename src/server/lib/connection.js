'use strict';

/**
 * mongodb connection script
 */



// require mongoose and set the path for connecting 
var mongoose = require('mongoose'),
  creds = require('../../../creds.json'),
  env = (process.env.NODE_ENV === 'testing' ? creds.testing : creds.dev),
  dbUrl = 'mongodb://' + env.user + ':' + env.pass + env.host;

// console.log('Trying to connect to: ' + dbUrl);


// connect to mongo 
mongoose.connect(dbUrl);

// close the Mongoose connection on Control+C 
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
  });
});

// used when populating the database for dev purposes only 
// require('../models/user');
// require('../models/item');
