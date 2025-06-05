import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
    errorMessage = signal('');

    updateErrorMessage = (control: FormControl) => {
    if (control.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (control.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  
}
