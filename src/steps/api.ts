import axios from "axios";

import {ApiService} from "./types";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const api: ApiService = {
  getSteps: () => axios.get(`${ENDPOINT}/steps`).then(({data}) => data),
};

export default api;
