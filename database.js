const { request } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'teokri',
    host: 'localhost',
    database: 'ubi_database',
    password: '',
    port: 5432,
})
  

module.exports = {pool}    

