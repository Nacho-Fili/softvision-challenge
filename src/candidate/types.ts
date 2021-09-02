export interface Candidate {
  id: string;
  name: string;
  comments?: string;
  step: string;
}

export interface ApiService {
  getCandidatesByStep: (step: string) => Promise<Candidate[]>;
  promoteCandidate: (candidate: Candidate) => void;
  backCandidate: (candidate: Candidate) => void;
}

export default Candidate;
