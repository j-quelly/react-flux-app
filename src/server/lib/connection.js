/**
 * mongodb connection script
 */

// require mongoose and set the path for connecting 
var mongoose = require('mongoose'),
  creds = require('../../../creds.json')
dbUrl = 'mongodb://' + creds.user + ':' + creds.pass + '@ds031925.mlab.com:31925/heroku_p6tvq97c';

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
