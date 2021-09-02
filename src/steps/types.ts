export interface ApiService {
  getSteps: () => Promise<string[]>;
}
