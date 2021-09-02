import {Candidate, ApiService} from "./types";
import mock from "./mock";
import EventsManager from "./EventsManager";

const api: ApiService = {
  getCandidatesByStep: (step: string) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mock.filter((candidate) => candidate.step === step)), 200);
    });
  },

  promoteCandidate: ({id}) => {
    EventsManager.Emitter().emit("promote", {id: id});
  },

  backCandidate: ({id}) => {
    EventsManager.Emitter().emit("back", {id: id});
  },
};

export default api;
