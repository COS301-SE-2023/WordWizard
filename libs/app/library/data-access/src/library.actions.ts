export class SetPractice{
  static readonly type = '[Library] Set Practice';
}

export class SetVocab{
  static readonly type = '[Library] Set Vocab';
}

export class UpdatePractice{
  static readonly type = '[Library] Update Practice';
  constructor(public payload: { userID: string, word: string }){}
}