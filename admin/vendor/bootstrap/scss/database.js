var mysql = require('mysql');

var pool = mysql.createPool({multipleStatements: true,
  connectionLimit : 100,
  host: 'localhost',
  user: 'root',
  password: 'shubham@2506',
  database: 'trouvaille',
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
