//Pure mysql
const mysql = require("mysql2");

//  methods to connect to the database
// 1- createConnection that will create a connection to the database with every query you make
// 2- createPool that will create a pool of connections to the database

// const pool = mysql.createPool({
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
// });

// module.exports = pool.promise();

//using sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Required for TiDB Cloud
      },
    },
  }
);
module.exports = sequelize;
