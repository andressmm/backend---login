const mysql=require('mysql2');

const pool=mysql.createPool({
    host:'localhost',
    user:'user',
    password:'passw',
    database:'mibase',
    port:3306,
    waitForConnections:true,
    connectionLimit:15,
    queueLimit:0,

}) // crea x cantidad de conexiones a la base de datos



module.exports={
    conn: pool.promise()
}
