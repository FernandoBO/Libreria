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

module.exports = {
    SQLconn: SQLconn
}


