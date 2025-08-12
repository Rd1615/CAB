const mysql = require("mysql2/promise");
const DB_NAME = "CAB";

 async function db(){
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "Rahul@1615",
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  console.log(`Database ${DB_NAME} is created`);

  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Rahul@1615",
    database: "CAB",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
};

const dbPromise = db();
module.exports = dbPromise;
