const { Router } = require('express');
var express = require('express');
var router = express.Router();
const sql = require('../book/BookClass');

router.get('/', function(req, res, next) {
  // res.send('Test respond with a resource');
  // ahi voy a meter la redirección del login
});

//Validamos que la conexión de base de datos sea correcta, accediendo a esta ruta 
//en el navegador se mostrará el resultado
router.get('/sql', function(req, res, next){
  sql.SQLconn()
  res.send('Conexión correcta base de datos SQL');
  console.log(res)
});

//Muestra todos los libros en la base de datos
router.get('/books', function(req, res, next){
  sql.getBooks().then((result) => {
    res.json(result[0])
    console.log(result[0])
  })
});

//Ruta para actualizar información de Libros
router.route('/bookU/:ID').put((req,res) => {
    sql.putBook(req.params.ID, req.body).then((result) => {
      res.json(result);
    })
});

//Ruta para eliminar información de Libros
router.route('/bookD/:ID').delete((req, res) => {
    try {
      sql.deleteBook(req.params.ID).then((result) => {
        res.json(result);
      })
    } catch (error) {
      console.log(error);
    }
});

module.exports = router;