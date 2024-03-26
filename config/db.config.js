const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "123456654321",
    host: "localhost",
    port: "5432",
    database: "tea"
});

module.exports = pool;