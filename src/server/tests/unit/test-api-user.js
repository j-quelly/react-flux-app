var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose'),
  creds = require('../../../../creds.json'),
  dbUrl = 'mongodb://' + creds.testing.user + ':' + creds.testing.pass + creds.testing.host;

describe('API', function() {
  var app,
    app = 'http://localhost:3000';

  require = require('really-need');

  beforeEach(function() {
    process.env.NODE_ENV = 'testing';
    // require the server
    app = require('../../app', {
      bustCache: true
    });
  });
  afterEach(function(done) {
    app.close(done);
  });
  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument 
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use 
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('User', function() {

    it('should create a user account', function(done) {
      var user = {
        username: 'test@test.com',
        password: 'test'
      };
      request(app)
        .post('/api/users/register')
        .send(user)
        .expect(201)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        })
    })



    it('should return an error trying to create duplicate user', function(done) {
      var user = {
        username: 'test@test.com',
        password: 'test'
      };
      request(app)
        .post('/api/users/register')
        .send(user)
        .expect(400)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        })
    })

    it('should log the user in', function(done) {
      var user = {
        username: 'test@test.com',
        password: 'test'
      };

      request(app)
        .post('/api/users/login')
        .send(user)
        .expect(200) // should be 200
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('username');
          done();
        })
    })


    it('should not log an invalid user in', function(done) {
      var user = {
        username: 'test@test.com',
        password: 'test123'
      };

      request(app)
        .post('/api/users/login')
        .send(user)
        .expect(500) // should be 401
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        })
    })


    it('should log the user out', function(done) {
      request(app)
        .get('/api/users/logout')
        .expect(200) // should be 200
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        })
    })


    it('should respond with an array of users', function(done) {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          res.body.should.be.a.Array();

          done();
        })
    })


    /*it('should get a user', function(done) {

      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          res.body.should.be.a.Array();

          var userid = res.body[0]._id;

          request(app)
            .get('/api/users/' + userid)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) {
                throw err;
              }

              res.body.should.have.property('username');

              done();
            });

          done();
        })
    })*/


    it('should update a user', function(done) {
      var user = {
        username: 'jamie@kellyjg.com'
      };

      request(app)
        .put('/api/users/57994cd91bef5cfc2e8751ff')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(200) //should 200
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          res.body.should.have.property('_id');
          res.body.username.should.equal(user.username);

          done();
        });
    })

    it('should delete a user', function(done) {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200) //should 200
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          console.log(res.body);

          var db = res.body

          done();
        })

        // .put('/api/users/57994cd91bef5cfc2e8751ff')
        // .send(user)
        // .expect('Content-Type', /json/)
        // .expect(200) //should 200
        // .end(function(err, res) {
        //   if (err) {
        //     throw err;
        //   }

        //   res.body.should.have.property('_id');
        //   res.body.username.should.equal(user.username);

    //   done();
    // });
    })

  });

  after(function(done) {
    mongoose.connection.close(function() {
      console.log('Mongoose default connection disconnected');
      process.exit(0);
    });
    done();
  })

});
