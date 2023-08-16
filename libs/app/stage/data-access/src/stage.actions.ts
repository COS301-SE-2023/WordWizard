export class SetStage {
  static readonly type = '[Stage] Set Stage';
}

export class SetSelectedStage {
  static readonly type = '[Stage] Set Selected Stage';
  constructor(public payload: number) {}
}

export class UpdateStage {
  static readonly type = '[Stage] Update Stage';
  constructor(public payload: { stars: number }) {}
}
