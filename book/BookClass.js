const config = require('../config/config');
const sql = require('mssql');

async function SQLconn() {
  try {
    let pool = await sql.connect(config)
    console.log('Conexión a sql server correcta');
  } catch (error) {
    console.log('No se pudo conectar a la base de datos')
  }
};

async function authentication(req, res) {
  const { Nombre, Contrasena } = req.body;

  try {
    return new Promise(async function (resolve, reject) {
      try {
        let result = sql.connect(config, function () {
          var Existe = 0;
          var Error = "";
          var Result = 0;
          var request = new sql.Request();
          request.input('Nombre', sql.VarChar, Nombre);
          request.input('Contrasena', sql.VarChar, Contrasena);
          request.output('Existe', sql.Int, Existe);
          request.output('IdResult', sql.Int, Result);
          request.output('Result', sql.VarChar(1000), Error);
          request.execute('ValidaUsuario', function (err, recordsets, returnValue, affected) {
            if (err) console.log(err);
            (async () => {
              const existe = recordsets.recordset[0].Existe;
              console.log(existe);
            });

            if (typeof recordsets == undefined || 0) {
              console.log(recordsets);
              resolve('nombre indefinido ');

            } else {
              resolve('Ok ');
            }
            // if (typeof recordsets.Contrasena === 'undefined' || recordsets.Contrasena == null || recordsets.Contrasena === '' ) {
            //   resolve('contraseña indefinida ');

            // } else {
            //   resolve('Ok ');
            // }
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  } catch (error) {
    console.log(error)
  }
};

//Obtención de todos los libros por Vista en SQL
async function getBooks() {
  try {
    //Se agrega conexión para interactuar con la base de datos
    let pool = await sql.connect(config);
    //Se agrega variable para mostrar información
    let res = await pool.request().query("SELECT * FROM LibInformacionLibrosVw (NOLOCK)")
    return res.recordsets;
  } catch (error) {
    console.log(error)
  }
};

async function getProviders() {
  try {
    const pool = await sql.connect(config);
    const data = await pool.request().query('dbo.LibProveedoresSPDts');
    return data.recordsets;
  } catch (error) {
    console.log(error)
  }
};

// fumción para el alta de libros
async function addBook(req, res) {
  const { IDProveedor, Autor, TituloLibro, Anio, Editorial } = req.body;
  return new Promise(async function (resolve, reject) {
    try {
      let result = sql.connect(config, function () {
        var AffectedRows = 0;
        var Error = "";
        var Result = 0;
        var request = new sql.Request();
        request.input('IDProveedor', sql.Int, IDProveedor);
        request.input('Autor', sql.VarChar, Autor);
        request.input('TituloLibro', sql.VarChar, TituloLibro);
        request.input('Anio', sql.Int, Anio);
        request.input('Editorial', sql.VarChar, Editorial);
        request.execute('LibLibrosSPI', function (err, recordsets, returnValue, affected) {
          if (err) {
            reject(err);
          }
          if (typeof recordsets === 'undefined') {
            resolve('Fail ' + '-' + IDProveedor);
          } else {
            resolve('Ok ' + '-' + IDProveedor);
          }
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

//Función para actualizar información
async function putBook(BookID, { IDProveedor, Autor, TituloLibro, Anio, Editorial }) {
  return new Promise(async function (resolve, reject) {
    try {
      //Se agrega conexión para interactuar con la base de datos
      let result = sql.connect(config, function () {
        var Error = "";
        var Result = 0;
        //Se agrega parametros de entrara para indicar que información se va a actualizar
        var request = new sql.Request();
        request.input("IDLibro", sql.Int, BookID);
        request.input("IDProveedor", sql.Int, IDProveedor);
        request.input("Autor", sql.VarChar(100), Autor);
        request.input("TituloLibro", sql.VarChar(100), TituloLibro);
        request.input("Anio", sql.Int, Anio);
        request.input("Editorial", sql.VarChar(100), Editorial);
        request.output('IdResult', sql.Int, Result);
        request.output('Result', sql.VarChar(1000), Error);
        // console.log(BookID, IDProveedor, Autor, TituloLibro, Anio, Editorial, Result, Error);
        //Se ejecuta el store procedure que edita información
        request.execute('LibLibrosSPU', function (err, recordsets, returnValue, affected) {
          if (err) {
            reject(err);
          }
          if (typeof recordsets === 'undefined') {
            resolve('Fail ' + '-' + BookID);
          } else {
            resolve('Ok ' + '-' + BookID);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
};

//Función para borrar por ID de libros
// async function deleteBook(BookID){
//     try {
//         sql.connect(config, function(){
//             //Se agrega parametros de entrara para indicar que ID's va a eliminar de Libros
//             var request = new sql.Request()
//             request.input('IDLibros', sql.Int, BookID);
//             console.log(BookID);
//             //Se ejecuta el store procedure que elimina información
//             request.execute('LibLibroSPD', function(err, recordsets, returnValue, affected) {
//             if(err) console.log(err);
//                 (async () => {
//                     console.log(recordsets);
//                 })();
//                 return 'Termina proceso';
//             })
//         })
//     } catch (error) {
//         console.log(error);
//     }
// };

async function deleteBook(BookID) {
  return new Promise(async function (resolve, reject) {
    try {
      let result = sql.connect(config, function () {
        var AffectedRows = 0;
        var Error = "";
        var Result = 0;
        var request = new sql.Request();
        request.input('IDLibros', sql.Int, BookID);
        request.output('IdResult', sql.Int, Result);
        request.output('Result', sql.VarChar(1000), Error);
        request.execute('LibLibroSPD', function (err, recordsets, returnValue, affected) {
          if (err) {
            reject(err);
          }
          if (typeof recordsets === 'undefined') {
            resolve('Fail ' + '-' + BookID);
          } else {
            resolve('Ok ' + '-' + BookID);
          }
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}



//Exportación de funciones para
module.exports = {
  SQLconn: SQLconn,
  authentication: authentication,
  getBooks: getBooks,
  getProviders: getProviders,
  addBook: addBook,
  putBook: putBook,
  deleteBook: deleteBook
}


