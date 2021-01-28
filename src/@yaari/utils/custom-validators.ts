import {AbstractControl} from '@angular/forms';

export class CustomValidator {

  static digitsOnly(control: AbstractControl): any {
    if (control && !isNaN(control.value)) {
      return null;
    }
    return { invalidNumber: true };
  }

  static lettersOnly(control: AbstractControl): any {
    if (control && control.value.match(/^[a-zA-Z]+$/)) {
      return null;
    }
    return { invalidLetters: true };
  }
}
