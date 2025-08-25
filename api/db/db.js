import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "myDemo",
});

const db = pool.promise();

export default db;
