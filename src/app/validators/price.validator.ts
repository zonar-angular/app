import { AbstractControl } from '@angular/forms';

export function priceValidator(
  control: AbstractControl): { 
    [key: string]: any } | null {
      const valid = /^\d+(\d{3})*(\.\d{1,2})?$/.test(control.value);
      return valid ? null : { invalidNumber: { valid: false, value: control.value } };
  }