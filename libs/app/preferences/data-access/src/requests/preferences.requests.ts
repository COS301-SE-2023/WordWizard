export interface GetPreferencesReq {
    child_id: string;
}

export interface UpdatePreferencesReq {
    child_id: string;
    preferences: string[];
}