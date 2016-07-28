var request = require('supertest'),
  chance = require('chance').Chance(),
  should = require('should');

var username = chance.email(),
  password = chance.string();
var stub = {
  username: username,
  password: password
};

describe('Loading Express', function() {
  var app, server;

  beforeEach(function() {
    process.env.NODE_ENV = 'testing';
    process.env.PORT = 3005;
    delete require.cache[require.resolve('../../bin/www')]
    app = require('../../app');
    server = require('../../bin/www');
  });

  afterEach(function(done) {
    server.close(done);
  });

  it('responds to /', function testSlash(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });


  describe('API User', function() {
    it('should create a user account', function(done) {
      request(app)
        .post('/api/users/register')
        .send(stub)
        .expect(201)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should update a user', function(done) {
      var user = {
        username: 'jamie@kellyjg.com'
      };
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
            .put('/api/users/' + userid)
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
        });

    });


    it('should error trying to create duplicate user', function(done) {
      var user = {
        username: 'jamie@kellyjg.com',
        password: stub.password
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
        });
    });


    it('should log the user in', function(done) {
      var user = {
        username: 'jamie@kellyjg.com',
        password: stub.password
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
        });
    });


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
        });
    });


    it('should log the user out', function(done) {
      request(app)
        .get('/api/users/logout')
        .expect(200) // should be 200
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });


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
        });
    });


    it('should get a user', function(done) {
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
        });
    });





    it('should delete a user', function(done) {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200) //should 200
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          var userid = res.body[0]._id;

          request(app)
            .delete('/api/users/' + userid)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) {
                throw err;
              }
              done();
            });
        });

    });


  });

});
