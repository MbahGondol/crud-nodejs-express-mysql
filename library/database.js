let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_xi.rpl_39'
});

connection.connect(function(error) {
    if(!!error) {
        console.log(error);
    } else {
        console.log('Koneksi Berhasil!');
    }
});

module.exports = connection;