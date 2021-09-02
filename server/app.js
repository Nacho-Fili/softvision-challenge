const path = require("path");

const express = require("express");

const app = express();
const loadApiEndpoints = require("./apiEndpoints");

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "dist")));

module.exports = loadApiEndpoints(app);
