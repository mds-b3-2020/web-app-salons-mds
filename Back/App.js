const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());


app.listen(8010, () => console.log("server is running"));