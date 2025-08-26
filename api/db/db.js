import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST ||"localhost",
  user: process.env.DB_USER ||"root",
  password: process.env.DB_PASSWORD ||"root",
  database: process.env.DB_NAME ||"myDemo",
});

const db = pool.promise();

export default db;
