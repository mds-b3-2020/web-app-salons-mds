const express = require("express");
const app = express();
const cors = require("cors");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();   
}
const { Client } = require('pg')

app.use(cors());
const connectionString = process.env.DATABASE_URL;
console.log(connectionString);

const client = new Client({connectionString, ssl: { rejectUnauthorized: false }})
client.connect()

const ReadResponse = client.query('SELECT * FROM response', (err, res) => {
})

app.get("/responses", (req, res) => {
  res.json(ReadResponse.fields);
})

app.listen(8010, () => console.log("server is running"));