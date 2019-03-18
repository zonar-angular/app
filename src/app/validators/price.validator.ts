import { AbstractControl } from '@angular/forms';

/*
priceValidator(AbstractControl)

Performs check on price. Must have 12, 12.3, or 12.34.
Unaccepted values include: -13, 12.345, 12., strings

Parameters: AbstractControl
Returns: Null if price OK, invalid status for validator if not OK
*/
export function priceValidator(
  control: AbstractControl): { 
    [key: string]: any } | null {
      const valid = /^\d+(\d{3})*(\.\d{1,2})?$/.test(control.value);
      return valid ? null : { invalidNumber: { valid: false, value: control.value } };
  }