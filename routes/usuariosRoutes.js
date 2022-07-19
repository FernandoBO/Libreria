const { Router } = require('express');
var express = require('express');
var router = express.Router();
const sql = require('../book/BookClass');

router.get('/', function(req, res, next) {
  // var fileName = './book/login';
  // res.send();
  // res.sendFile('./book/login.html', { root: '.' }, { msg: "logueo de usuario" });
  // res.send('Test respond with a resource');
  // meter redirección del login
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

// Muestra dataSets de prveedores en la base de datos
router.get("/providers", function (req, res) {
  sql.getProviders().then((result) => {
    res.json(result[0])
    console.log(result[0])
  })
});

// Autenticación de usuarios
router.get("/authUsers", async (req, res) => {
  const user = reFq.body.Nombre;
  const password = req.body.Contrasena;
});

// Realiza la alta de un libro
router.route('/bookRegister').post((req, res) => {
  var data = req.body;
  // console.log(data)
  try {
    sql.addBook(req, res).then((result) => {
      console.log(result);
      res.json(result);
    })
  } catch (error) {
    console.log(error);
  }
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