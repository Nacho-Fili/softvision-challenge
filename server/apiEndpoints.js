const path = require("path");

const candidates = require("./candidates.js");
const steps = require("./steps");

const loadApiEndpoints = (app) => {
  app.get("/", (req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));

  app.get("/candidates", (req, res) => {
    const {step} = req.query;

    if (!step) res.sendStatus(400);
    res.send(candidates.filter((candidate) => candidate.step === step));
  });

  app.get("/steps", (req, res) => {
    res.send(steps);
  });

  return app;
};

module.exports = loadApiEndpoints;
