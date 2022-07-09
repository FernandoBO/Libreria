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

async function getBooks(){
    try {
        let pool = await sql.connect(config);
        let res = await pool.request().query("SELECT * FROM LibInformacionLibrosVw (NOLOCK)")
        return res.recordsets;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    SQLconn: SQLconn,
    getBooks : getBooks
}


