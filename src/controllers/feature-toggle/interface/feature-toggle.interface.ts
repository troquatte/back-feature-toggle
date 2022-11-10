export interface IFeatureToggle {
  _id?: string;
  projectName: string;
  apiKey?: string;
  itensEnvironment: Array<{
    env: string;
    toggle: Array<{ name: string; value: boolean }>;
  }>;
}

export interface IFeatureToggleChange {
  apiKey: string;
  env: string;
  toggleName: string;
  toggleValue: Boolean;
}
