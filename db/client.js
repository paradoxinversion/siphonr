const pgp = require('pg-promise')();

const connection = "postgress://localhost:5432/siphonr";

const db = pgp(connection);
module.exports = db;
