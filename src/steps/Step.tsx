import React from "react";

import CandidateListContainer from "../candidate";
import {ApiService} from "../candidate/types";

import styles from "./styles.module.scss";

interface Props {
  name: string;
  apiCandidateService: ApiService;
}

const Step: React.FC<Props> = ({name, apiCandidateService}) => {
  return (
    <div className={styles.step}>
      <h1>{name}</h1>
      <CandidateListContainer service={apiCandidateService} step={name} />
    </div>
  );
};

export default Step;
