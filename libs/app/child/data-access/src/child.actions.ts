export class GetChildren {
    static readonly type = '[Child] Get Children';
    constructor(public payload: { parent_email: string }){}
}

export class SetChild {
    static readonly type = '[Child] Set Child';
    constructor(public payload: { childId: string }){}
}