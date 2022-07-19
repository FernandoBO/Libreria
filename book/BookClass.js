const config = require('../config/config')
const sql = require('mssql')

async function SQLconn(){
    try {
        let pool = await sql.connect(config)
        console.log('Conexión a sql server correcta');
    } catch (error) {
        console.log('No se pudo conectar a la base de datos')
    }
}

//Obtención de todos los libros por Vista en SQL
async function getBooks(){
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
async function add(req, res){
    const {IDProveedor,Autor,TituloLibro, Anio, Editorial} = req.body;
    console.log(TituloLibro);
      return new Promise(async function(resolve, reject) {
        try{
          let result = sql.connect(config, function() {
            var AffectedRows = 0;
            var Error = "";
            var Result = 0;
            var request = new sql.Request();
            request.input('IDProveedor', sql.Int, IDProveedor);
            request.input('Autor', sql.VarChar, Autor);
            request.input('TituloLibro', sql.VarChar, TituloLibro);
            request.input('Anio', sql.Int, Anio);
            request.input('Editorial', sql.VarChar, Editorial);
            request.execute('LibLibrosSPI', function(err, recordsets, returnValue, affected) {
                if(err){
                  reject(err);
                }
                if (typeof recordsets === 'undefined'){
                  resolve('Fail '+'-'+IDProveedor);
                }else{
                  resolve('Ok '+'-'+IDProveedor);
                }
            });
          });
        }catch(err){
          reject(err);
        }
      });
  }
async function getProviders() {
    try {
        const pool = await sql.connect(config);
        const data = await pool.request().query('dbo.LibProveedoresSPDts');
        return data.recordsets;
    } catch (error) {
        console.log(error)
    }
};


async function addBook(req, res){
    const {idProveedor, Author, BookTitle, Year, BookEditorial} = req.body;
    try {
        //Se agrega conexión para interactuar con la base de datos
        sql.connect(config, function(){
            //Se agrega parametros de entrara para indicar que información se va a actualizar
            const request = new sql.request();
            // request.input("IDLibro", sql.Int, BookID);
            request.input("IDProveedor", sql.Int, idProveedor);
            request.input("Autor", sql.VarChar(100), Author);
            request.input("TituloLibro", sql.VarChar(100), BookTitle);
            request.input("Anio", sql.Int, Year);
            request.input("Editorial", sql.VarChar(100), BookEditorial);
            console.log(idProveedor, Author, BookTitle, Year, BookEditorial);
            //Se ejecuta el store procedure que edita información
            request.execute('dbo.LibLibrosSPI', function(err, recordsets, returnValue, affected) {
                if(err) console.log(err);
                (async () => {
                  console.log(recordsets);
                })();
                return 'Termina proceso';
            });
        });
    } catch (error) {
        console.log(error);
    }
};
//Función para actualizar información
async function putBook(BookID, {SupplierID, Author, BookTitle, Year, BookEditorial}){
    try {
        //Se agrega conexión para interactuar con la base de datos
        sql.connect(config, function(){
            //Se agrega parametros de entrara para indicar que información se va a actualizar
            var request = new sql.request();
            request.input("IDLibro", sql.Int, BookID);
            request.input("IDProveedor", sql.Int, SupplierID);
            request.input("Autor", sql.VarChar(100), Author);
            request.input("TituloLibro", sql.VarChar(100), BookTitle);
            request.input("Anio", sql.Int, Year);
            request.input("Editorial", sql.VarChar(100), BookEditorial);
            console.log(BookID, SupplierID, Author, BookTitle, Year, BookEditorial);
            //Se ejecuta el store procedure que edita información
            // request.execute('LibLibrosSPU', function(err, recordsets, returnValue, affected) {
            //     if(err) console.log(err);
            //     (async () => {
            //       console.log(recordsets);
            //     })();
            //     return 'Termina proceso';
            // });
        });
    } catch (error) {
        console.log(error);
    }
};

//Función para borrar por ID de libros
async function deleteBook(BookID){
    try {
        sql.connect(JSON.stringify(config), function(){
            //Se agrega parametros de entrara para indicar que ID's va a eliminar de Libros
            var request = new sql.Request()
            request.input('IDLibros', sql.Int, BookID);
            //Se ejecuta el store procedure que elimina información
            request.execute('LibLibroSPD', function(err, recordsets, returnValue, affected) {
            if(err) console.log(err);
                (async () => {
                    console.log(recordsets);
                })();
                return 'Termina proceso';
            })
        })
    } catch (error) {
        console.log(error);
    }
};


//Exportación de funciones para
module.exports = {
    SQLconn: SQLconn,
    getBooks : getBooks,
    getProviders : getProviders,
    add : add,
    putBook : putBook,
    deleteBook : deleteBook
}


