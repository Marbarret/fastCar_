require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const itemRoute = require("./src/routes/itemRoute");

app.use("/items", itemRoute);
app.get('/', (_req, res) => res.send('API online'));


module.exports = app;