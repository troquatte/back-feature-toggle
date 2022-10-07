export interface IFeatureToggle {
  _id?: string;
  projectName: string;
  apiKey?: string;
  itensEnvironment: [string, [[string, boolean]]];
}
