/**
 * User model
 */

'use strict';

// require mongoose for data modeling 
var mongoose = require('mongoose'),

  // schema class 
  Schema = mongoose.Schema,

  // passport's local strat 
  passportLocalMongoose = require('passport-local-mongoose');


// defines our user schema 
var userSchema = new Schema({
  username: String,
  password: String,
  admin: Boolean
});

// plugs into our user schema to take care of salting and hashing the password 
userSchema.plugin(passportLocalMongoose);

// first param is the singular name for the collection, 
// mongoose automatically looks for the plural version
// so our db will have a 'users' collection
module.exports = mongoose.model('User', userSchema);
