var supertest = require('supertest'),
  app = require('../../app');

exports.homepage_should_200 = function(done) {
  supertest(app)
    .get('/')
    .expect(200)
    .end(done);
};
