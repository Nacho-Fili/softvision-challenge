import React from "react";
import {screen, waitFor, render} from "@testing-library/react";

import "@testing-library/jest-dom";
import {ApiService} from "../../candidate/types";
import StepList from "../StepList";
import candidates from "../../candidate/mock";

let service: ApiService;

beforeEach(() => {
  service = {
    getCandidatesByStep: jest.fn((step) =>
      Promise.resolve(candidates.filter((candidate) => candidate.step === step)),
    ),
    promoteCandidate: () => {},
    backCandidate: () => {},
  };
});

describe("Step List test", () => {
  it("Step list renders correctly all the steps", async () => {
    render(<StepList apiCandidateService={service} steps={["Entrevista Inicial", "Oferta"]} />);

    await waitFor(() => expect(service.getCandidatesByStep).toHaveReturned())
      .then(() => {
        expect(screen.queryByText(/oferta/i)).toBeInTheDocument();
        expect(screen.queryByText(/entrevista inicial/i)).toBeInTheDocument();
      })
      .catch((err) => {
        throw err;
      });
  });
});
