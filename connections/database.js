const mysql = require('mysql');

const environment = `PRODUCCION`;

let mysqlConnection;

if (environment === `DESARROLLO`) {
    mysqlConnection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'sissalss',
        multipleStatements: true
    });
} else if (environment == 'PRODUCCION') {
    mysqlConnection = mysql.createPool({
        host: 'us-cdbr-east-05.cleardb.net',
        user: 'bce424573c357c',
        password: '2ea94c75',
        database: 'heroku_7ece61556732480',
        multipleStatements: true
    });
}

// mysqlConnection.connect(function (err) {
//     if (err) {
//         console.error(err.stack);
//         return;
//     } else {
//         console.log('db is connected');
//     }
// });

mysqlConnection.query('select 1 + 1', (err, rows) => {
    if (err) return err.stack;   

    console.log('db is connected');
})



module.exports = mysqlConnection;
