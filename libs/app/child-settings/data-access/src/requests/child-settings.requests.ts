export interface EditChildRqst {
    child_id: string;
    name: string;
    age: number;
    profile_picture: string;
}

export interface DeleteChildRqst {
    child_id: string;
}
