export interface SetPinRqst {
    parent_email: string;
    new_pin: string;
    validation_word: string;
  }

export interface ValidatePasswordRqst {
    parent_email: string;
    validation_word: string;
}
export interface PinRqst {
    parent_email: string;
}

