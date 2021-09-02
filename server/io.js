const socketIO = require("socket.io");

const steps = require("./steps");
const candidates = require("./candidates");

const loadEvents = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("Connection\n");
    socket.on("promote", (args) => {
      const {id} = args[0];
      const candidate = candidates.find((candidate) => candidate.id === id);

      if (!candidate) return;
      let actualStep;
      let newStep;

      for (let i = 0; i < steps.length; i++)
        if (candidate.step === steps[i] && i < steps.length - 1) {
          actualStep = steps[i];
          newStep = steps[i + 1];
          candidate.step = steps[i + 1];
          socket.emit(
            actualStep,
            candidates.filter((candidate) => candidate.step === actualStep),
          );
          socket.emit(
            newStep,
            candidates.filter((candidate) => candidate.step === newStep),
          );
          break;
        }
    });

    socket.on("back", (args) => {
      const {id} = args[0];
      const candidate = candidates.find((candidate) => candidate.id === id);

      if (!candidate) return;
      let actualStep;
      let newStep;

      for (let i = 0; i < steps.length; i++)
        if (candidate.step === steps[i] && i != 0) {
          actualStep = steps[i];
          newStep = steps[i - 1];
          candidate.step = steps[i - 1];
          socket.emit(
            actualStep,
            candidates.filter((candidate) => candidate.step === actualStep),
          );
          socket.emit(
            newStep,
            candidates.filter((candidate) => candidate.step === newStep),
          );
          break;
        }
    });
  });
};

module.exports = loadEvents;
