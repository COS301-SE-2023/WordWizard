export class GetChildren {
    static readonly type = '[Child] Get Children';
    constructor(public payload: { parent_email: string, parent_name: string }){}
}

export class SetChild {
    static readonly type = '[Child] Set Child';
    constructor(public payload: { childId: string }){}
}