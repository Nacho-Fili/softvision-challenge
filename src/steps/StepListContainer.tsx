import React from "react";

import candidatesDefaultService from "../candidate/api";
import {ApiService as CandidatesApiService} from "../candidate/types";

import stepsDefaultService from "./api";
import StepList from "./StepList";
import {ApiService as StepsApiService} from "./types";
import styles from "./styles.module.scss";

enum Status {
  PENDING,
  SUCCESS,
  ERROR,
}

interface Props {
  candidatesService?: CandidatesApiService;
  stepsService?: StepsApiService;
}

const StepListContainer: React.FC<Props> = ({
  candidatesService = candidatesDefaultService,
  stepsService = stepsDefaultService,
}) => {
  const [steps, setSteps] = React.useState<string[]>([]);
  const [statusState, setStatusState] = React.useState<Status>(Status.PENDING);

  React.useEffect(() => {
    stepsService
      .getSteps()
      .then((fetchedSteps) => {
        setSteps(fetchedSteps);
        setStatusState(Status.SUCCESS);
      })
      .catch(() => setStatusState(Status.ERROR));
  }, [stepsService]);

  return (
    <div className={styles.stepsListContainer}>
      {statusState === Status.SUCCESS && (
        <StepList apiCandidateService={candidatesService} steps={steps} />
      )}
      {statusState === Status.PENDING && <p>Cargando...</p>}
      {statusState === Status.ERROR && <p>Oops!</p>}
    </div>
  );
};

export default StepListContainer;
