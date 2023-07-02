export class AddChild {
  static readonly type = '[AddChild] Add Child';
  constructor(public payload: { userID: string, word: string }){}
}

export class GetProfilePictures{
  static readonly type = '[GetProfilePictures] Get Profile Pictures';
}