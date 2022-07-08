var express = require('express');
var router = express.Router();
const sql = require('../book/BookClass.js');

router.get('/', function(req, res, next) {
  res.send('Test respond with a resource');
  // ahi voy a meter la redirección del login
});

router.get('/sql', function(req,res,next){
  sql.SQLconn()
  res.send('Conexión correcta base de datos SQL');
  console.log(res)
})


module.exports = router;