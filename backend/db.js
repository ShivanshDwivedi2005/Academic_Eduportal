// const mysql = require("mysql2");
// //import { createConnection } from "mysql2";

// const db = createConnection({
//   host: "localhost",
//   user: "root",           // your MySQL username
//   password: "newpassword", // your MySQL password
//   database: "eduportal"   // your database name
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

// //export default db;
// module.exports = db;


const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",           // your MySQL username
  password: "newpassword", // your MySQL password
  database: "eduportal"   // your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
