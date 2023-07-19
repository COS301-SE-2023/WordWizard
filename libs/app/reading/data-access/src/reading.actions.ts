import { Content } from "./interfaces/reading.interfaces";

export class SetPassage {
  static readonly type = '[Reading] Set Passage';
  // constructor(public payload: { passage: string }) { }
}

export class MakeAttempt{
  static readonly type = '[Reading] Make Attempt';
  constructor(public payload: { newAttempt: string }) { }
}


export class UpdateProgress{
  static readonly type = '[Reading] Update Progress';
  constructor(public payload: { content: Content, childId: string }) { }
}
