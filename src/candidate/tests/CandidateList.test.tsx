import React from "react";
import {screen, render} from "@testing-library/react";

import CandidateList from "../CandidateList";
import "@testing-library/jest-dom";
import candidates from "../mock";
import {ApiService} from "../types";

let service: ApiService;

beforeEach(() => {
  service = {
    getCandidatesByStep: (step) =>
      Promise.resolve(candidates.filter((candidate) => candidate.step === step)),

    promoteCandidate: () => {},
    backCandidate: () => {},
  };
});

describe("Candidate List test", () => {
  it("if list is empty, renders a message", () => {
    render(<CandidateList candidates={[]} service={service} />);
    expect(screen.queryByText(/no hay candidatos/i)).toBeInTheDocument();
  });

  it("Candidate List renders one candidate correctly", () => {
    render(<CandidateList candidates={[candidates[0]]} service={service} />);

    expect(screen.queryByText(candidates[0].name)).toBeInTheDocument();
  });

  it("Candidate List renders the third candidate correctly", () => {
    render(<CandidateList candidates={candidates} service={service} />);

    expect(screen.queryByText(candidates[2].name)).toBeInTheDocument();
  });
});
