import React from "react";

import CandidateType, {ApiService} from "./types";
import styles from "./styles.module.scss";

interface Props {
  candidate: CandidateType;
  service: ApiService;
}

const Candidate: React.FC<Props> = ({candidate, service}) => (
  <div className={styles.candidateCard}>
    <div className={styles.candidateDetails}>
      <p className={styles.candidateName}>{candidate.name}</p>
      {candidate.comments && <p className={styles.candidateComment}>{candidate.comments}</p>}
    </div>
    <div className={styles.controlsContainer}>
      <button onClick={() => service.backCandidate(candidate)}>{"<"}</button>
      <button onClick={() => service.promoteCandidate(candidate)}>{">"}</button>
    </div>
  </div>
);

export default Candidate;
