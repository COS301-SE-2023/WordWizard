import { Content } from './interfaces/reading.interfaces';

export class SetPassage {
  static readonly type = '[Reading] Set Passage';
}

export class MakeAttempt {
  static readonly type = '[Reading] Make Attempt';
  constructor(public payload: { newAttempt: string }) {}
}

export class UpdateProgress {
  static readonly type = '[Reading] Update Progress';
}

export class SetStatus {
  static readonly type = '[Reading] Set Status';
  constructor(public payload: { status: boolean }) {}
}

export class ResetPassage{
  static readonly type = '[Reading] Reset Passage';
}