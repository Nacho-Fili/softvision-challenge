import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";

import Step from "../Step";
import {ApiService} from "../../candidate/types";
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

describe("Step presentational test", () => {
  it("Step displays correctly the name", async () => {
    render(<Step apiCandidateService={service} name="Entrevista inicial" />);
    await waitFor(() => expect(service.getCandidatesByStep).toHaveReturned())
      .then(() => {
        expect(screen.queryByText(candidates[1].name)).toBeInTheDocument();
      })
      .catch((err) => {
        throw err;
      });
  });

  it("Step displays correctly one candidate in this step", async () => {
    render(<Step apiCandidateService={service} name="Entrevista inicial" />);

    await waitFor(() => expect(service.getCandidatesByStep).toHaveReturnedTimes(1))
      .then(() => {
        expect(screen.queryByText(candidates[1].name)).toBeInTheDocument();
      })
      .catch((err) => {
        throw err;
      });
  });
});
