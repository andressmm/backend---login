const mysql=require('mysql2');

const pool=mysql.createPool({
    host:'190.228.29.59',
    user:'natriouruguay',
    password:'Eduardo/3412',
    database:'uruguay',
    port:3306,
    waitForConnections:true,
    connectionLimit:15,
    queueLimit:0,

}) // crea x cantidad de conexiones a la base de datos



module.exports={
    conn: pool.promise()
}