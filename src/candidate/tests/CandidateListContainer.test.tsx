import React from "react";
import {screen, render, waitFor} from "@testing-library/react";

import CandidateListContainer from "../CandidateListContainer";
import {ApiService} from "../types";
import "@testing-library/jest-dom";
import candidates from "../mock";

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

describe("Candidate List Container test", () => {
  it("Container shows correctly the candidates after request", async () => {
    render(<CandidateListContainer service={service} step="Oferta" />);

    await waitFor(() => expect(service.getCandidatesByStep).toHaveReturned())
      .then(() => {
        expect(screen.queryByText(candidates[2].name)).toBeInTheDocument();
      })
      .catch((err) => {
        throw err;
      });
  });

  it("Container doesn't show a candidate if is not at the expected step", async () => {
    render(<CandidateListContainer service={service} step="Oferta" />);

    await waitFor(() => expect(service.getCandidatesByStep).toHaveReturned())
      .then(() => {
        expect(screen.queryByText(candidates[1].name)).toBeNull();
      })
      .catch((err) => {
        throw err;
      });
  });

  it("Container shows oops message in request error", async () => {
    service = {
      getCandidatesByStep: jest.fn(() => Promise.reject("Error fetching data")),
      promoteCandidate: () => {},
      backCandidate: () => {},
    };

    render(<CandidateListContainer service={service} step="Entrevista inicial" />);

    await waitFor(() => expect(service.getCandidatesByStep).toHaveReturned())
      .then(() => {
        expect(screen.queryByText(/oops/i)).toBeInTheDocument();
      })
      .catch((err) => {
        throw err;
      });
  });
});
