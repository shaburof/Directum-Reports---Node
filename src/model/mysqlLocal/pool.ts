import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_LOCAL_SERVER,
    user: process.env.MYSQL_LOCAL_USER,
    password: process.env.MYSQL_LOCAL_PASS,
    database: process.env.MYSQL_LOCAL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});



export { pool };