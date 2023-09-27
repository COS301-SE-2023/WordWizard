export interface PreferenceResponse {
  preferences: string[];
}

export interface GetPreferencesResponse {
  status: string;
}

export interface Topics {
  topics: string[];
}

export interface preferences {
  value: string;
  color: string;
}
