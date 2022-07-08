var sql = require('mssql');
 var sqlConfig = {
    user: 'interfase',
    password: 'G1nt3rf4s3',
    server: '172.24.16.54',
    database: 'Alimentadores',
    trustServerCertificate: true,
    connectionTimeout: 60000000,
    requestTimeout: 60000000
}

module.exports = sqlConfig