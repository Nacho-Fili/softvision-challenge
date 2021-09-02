import axios from "axios";

import {ApiService} from "./types";

const api: ApiService = {
  getSteps: () => axios.get("http://localhost:3000/steps").then(({data}) => data),
};

export default api;
