var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Test respond with a resource');

  // ahi voy a meter la redirección del login
});

module.exports = router;