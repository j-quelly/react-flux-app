var express = require('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
