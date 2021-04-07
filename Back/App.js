const express = require("express");
const app = express();
const cors = require("cors");
if (process.env.ENV_PROD !== true) {
    require('dotenv').config();   
}
const { Client } = require('pg')

app.use(cors());

const client = new Client(process.env.DATABASE_URL)
client.connect()
//exemple de requete
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})



app.listen(8010, () => console.log("server is running"));