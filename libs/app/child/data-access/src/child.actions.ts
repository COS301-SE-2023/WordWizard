export class GetChildren{
    static readonly type = '[Child] Get Children';
    constructor(public payload: { parent_email: string }){}
  }