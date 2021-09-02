import axios from "axios";

import {ApiService} from "./types";
import EventsManager from "./EventsManager";

const api: ApiService = {
  getCandidatesByStep: (step: string) =>
    axios.get(`/candidates?step=${step}`).then(({data}) => data),

  promoteCandidate: ({id}) => {
    EventsManager.Emitter().emit("promote", {id: id});
  },

  backCandidate: ({id}) => {
    EventsManager.Emitter().emit("back", {id: id});
  },
};

export default api;
