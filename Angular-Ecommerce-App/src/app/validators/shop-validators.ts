import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {

  // whitespace validation
  static notOnlyWhitespace(control: FormControl) : ValidationErrors {

    // check if string only contains whitespace
    if ((control.value != null) && (control.value.trim().length === 0 )) {

      // invalid, return error object
      return {'notOnlyWhitespace': true };
    }
    return null;
  }

}
