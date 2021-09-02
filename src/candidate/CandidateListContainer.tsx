import React, {useState} from "react";

import CandidateList from "./CandidateList";
import EventsManager from "./EventsManager";
import Candidate, {ApiService} from "./types";

interface Props {
  service: ApiService;
  step: string;
}

enum status {
  PENDING,
  SUCCESS,
  ERROR,
}

const CandidateListContainer: React.FC<Props> = ({service, step}) => {
  const [statusState, setStatusState] = useState<status>(status.PENDING);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  React.useEffect(() => {
    service
      .getCandidatesByStep(step)
      .then((candidates) => {
        setStatusState(status.SUCCESS);
        setCandidates(candidates);
        EventsManager.Listener().listen(step, (data) => setCandidates(data));
      })
      .catch(() => setStatusState(status.ERROR));
  }, [service, step]);

  return (
    <>
      {statusState === status.SUCCESS && (
        <CandidateList candidates={candidates} service={service} />
      )}
      {statusState === status.ERROR && <p>oops!</p>}
      {statusState === status.PENDING && <p>cargando...</p>}
    </>
  );
};

export default CandidateListContainer;
