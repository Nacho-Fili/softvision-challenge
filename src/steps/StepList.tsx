import React from "react";

import {ApiService} from "../candidate/types";

import Step from "./Step";

interface Props {
  steps: string[];
  apiCandidateService: ApiService;
}

const StepList: React.FC<Props> = ({steps, apiCandidateService}) => {
  return (
    <>
      {steps.map((step) => (
        <Step key={step} apiCandidateService={apiCandidateService} name={step} />
      ))}
    </>
  );
};

export default StepList;
