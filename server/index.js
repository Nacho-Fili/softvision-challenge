const app = require("./app");

const PORT = process.env.PORT || 3000;
const http = require("http");

const loadEvents = require("./io");

const server = http.createServer(app);

loadEvents(server);
server.listen(PORT, () => console.log("Listening on port 3000"));
