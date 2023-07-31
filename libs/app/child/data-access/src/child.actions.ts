export class GetChildren {
    static readonly type = '[Child] Get Children';
    constructor(public payload: { parent_email: string, parent_name: string }){}
}

export class SetChild {
    static readonly type = '[Child] Set Child';
    constructor(public payload: { childId: string }){}
}

export class EditChild{
    static readonly type = '[Child] Edit Child';
    constructor(public payload: { childId: string, name: string, image: string }){}
}

export class ChangeActive{
    static readonly type = '[Child] Change Active';
    constructor(public payload: { parentActive: boolean }){}
}

export class AddChild{
    static readonly type = '[Child] Add Child';
    constructor(public payload: { parentName: string, parentEmail: string, name: string, age: number, image: string }){}
}

export class DeleteChild{
    static readonly type = '[Child] Delete Child';
    constructor(public payload: { childId: string }){}
}