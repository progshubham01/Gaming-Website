var mysql = require('mysql');

var pool = mysql.createPool({multipleStatements: true,
  connectionLimit : 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'game',
  charset: 'UTF8MB4_GENERAL_CI'
});

pool.getConnection((err,db) => {
  if (err) {
      throw err;
  }
  console.log('SQL Connected');
  db.release();
});

module.exports = pool;
