console.clear();
console.log('------------------------------------');

import express from 'express';
import expressMysqlSession from 'express-mysql-session';
import cors from 'cors';
const session = require('express-session');
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cors({
    origin: ['http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // enable set cookie
}));

// add sessions
const MySQLStore = expressMysqlSession(session)
const sessionStore = new MySQLStore({
    host: '127.0.0.1',
    port: 3306,
    user: process.env.MYSQL_LOCAL_USER,
    password: process.env.MYSQL_LOCAL_PASS,
    database: 'appeals',
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
});
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60, httpOnly: true, signed: true }
}));
//finish add sessions



app.listen(process.env.PORT, () => console.log(`Listen ${process.env.PORT} port...`));

let debug = !true;
let dontShowData = true;

export { app, debug, dontShowData };



