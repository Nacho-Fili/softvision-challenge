import axios from "axios";

import {ApiService} from "./types";

const ENDPOINT = import.meta.env.REACT_APP_ENDPOINT;

const api: ApiService = {
  getSteps: () => axios.get(`/steps`).then(({data}) => data),
};

export default api;
