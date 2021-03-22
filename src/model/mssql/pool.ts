import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();


const sqlConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASS,
    database: process.env.MSSQL_DB,
    stream: false,
    options: {
        enableArithAbort: true,
        encrypt: false
    },
    port: 1433,
    server: process.env.MSSQL_SERVER,
};

let pool = () => {
    let poolSql = sql.connect(sqlConfig);

    return poolSql;
}

export { pool };