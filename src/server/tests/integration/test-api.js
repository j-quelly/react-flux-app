var supertest = require('supertest'),
  app = require('../../app');

exports.API_should_404 = function(done) {
  supertest(app)
    .get('/api')
    .expect(404)
    .end(done);
};

exports.API_user_should_404 = function(done) {
  supertest(app)
    .get('/api/user')
    .expect(404)
    .end(done);
};

exports.API_user_register_should_404 = function(done) {
  supertest(app)
    .get('/api/user/register')
    .expect(200)
    .end(done);
};
