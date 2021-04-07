const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const { Pool, Client } = require('pg')

app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_BASE,
  password: process.env.DB_PASS,
  port: 3211,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_BASE,
    password: process.env.DB_PASS,
    port: 3211,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

app.listen(8010, () => console.log("server is running"));