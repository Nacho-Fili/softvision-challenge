import React from "react";

import Candidate from "./Candidate";
import CandidateType, {ApiService} from "./types";
import styles from "./styles.module.scss";

interface Props {
  candidates: CandidateType[];
  service: ApiService;
}

const CandidateList: React.FC<Props> = ({candidates, service}) => {
  return Boolean(!candidates.length) ? (
    <div className={styles.noCandidate}>
      <p>No hay candidatos</p>
    </div>
  ) : (
    <div className={styles.list}>
      {candidates.map((candidate) => (
        <Candidate key={candidate.id} candidate={candidate} service={service} />
      ))}
    </div>
  );
};

export default CandidateList;
