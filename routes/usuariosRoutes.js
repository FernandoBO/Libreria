const { Router } = require('express');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const sql = require('../book/BookClass');

router.get('/', function (req, res, next) {
  // var fileName = './book/login';
  // res.send();
  // res.sendFile('./book/login.html', { root: '.' }, { msg: "logueo de usuario" });
  // res.send('Test respond with a resource');
  // meter redirección del login
});

//Validamos que la conexión de base de datos sea correcta, accediendo a esta ruta 
//en el navegador se mostrará el resultado
router.get('/sql', function (req, res, next) {
  sql.SQLconn()
  res.send('Conexión correcta base de datos SQL');
  console.log(res)
});

//Muestra todos los libros en la base de datos
router.get('/books', function (req, res, next) {
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

router.route('/getToken').post((req, res) => {
  var data = req.body;
  const token = jwt.sign({ data: data }, 'TokenSecretKey');
  res.json({
    token: token
  });
});


router.get('/tokenVerify', ensureToken, (req, res) =>{

  res.json({
    text: 'Protected by Token'
  })
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();

   }else {
    // access denied 
    res.sendStatus(403)
    // res.json ({
    //   text: 'access denied'
    // });
  }
}
// Autenticación de usuarios
router.route('/authUsers').post((req, res) => {
  var data = req.body;
  console.log(data)
  try {
    // sql.authentication(Nombre,Contrasena)
    // sql.authentication({params:{Nombre: data.Nombre, Contrasena: data.Contrasena}})
    sql.authentication(req, res)
      .then((result) => {
        res.json(result[0])
        console.log(result[0])
        // jwt.sign({ data: data }, 'tokenSecret', (err, token) => {
        //   res.json({ token })
        // })
      })
  } catch (error) {
    console.log(error);
  }
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
router.route('/bookU/:ID').put((req, res) => {
  sql.putBook(req.params.ID, req.body).then((result) => {
    res.json(result);
  })
});

//Ruta para eliminar información de Libros
router.route('/bookD/:ID').delete((req, res) => {
  sql.deleteBook(req.params.ID).then((result) => {
    res.json(result);
  })
});

module.exports = router;