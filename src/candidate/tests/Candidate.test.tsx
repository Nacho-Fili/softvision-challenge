import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";

import Candidate from "../Candidate";
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

describe("Presentational candidate test", () => {
  it("Must display the candidate name", () => {
    const candidate = candidates[0];

    render(<Candidate candidate={candidate} service={service} />);
    expect(screen.queryByText(candidate.name)).toBeInTheDocument();
  });

  it("If exists, must display the comments", () => {
    const candidate = candidates[1];

    candidate.comments = "Good soft skills";

    render(<Candidate candidate={candidate} service={service} />);
    expect(screen.queryByText(candidate.comments)).toBeInTheDocument();
  });
});
