import React from "react";
import "@testing-library/jest-dom";
import {screen, render, waitFor} from "@testing-library/react";

import StepListContainer from "../StepListContainer";
import {ApiService as CandidatesService} from "../../candidate/types";
import {ApiService as StepsService} from "../types";
import candidates from "../../candidate/mock";
import steps from "../mock";

let candidatesService: CandidatesService;
let stepsService: StepsService;

beforeEach(() => {
  candidatesService = {
    getCandidatesByStep: jest.fn((step) =>
      Promise.resolve(candidates.filter((candidate) => candidate.step === step)),
    ),
    promoteCandidate: () => {},
    backCandidate: () => {},
  };

  stepsService = {
    getSteps: jest.fn(() => Promise.resolve(steps)),
  };
});

describe("Step List Container test", () => {
  it("Step List Container fetch and show correctly all steps", async () => {
    render(<StepListContainer candidatesService={candidatesService} stepsService={stepsService} />);

    await waitFor(() => expect(stepsService.getSteps).toHaveReturned()).then(
      async () =>
        await waitFor(() => expect(candidatesService.getCandidatesByStep).toHaveReturned()).then(
          () => {
            steps.forEach((step) => expect(screen.queryByText(step)).toBeInTheDocument());
          },
        ),
    );
  });
});
