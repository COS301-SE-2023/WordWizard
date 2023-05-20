//define actions here...

export class Example {
  static readonly type = '[Example] Set ListWord';
  constructor(public payload: { word: string }) { }
}
