import { Component, Input, signal, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { AuthHelperService } from '../service/auth-helper.service';

@Component({
  imports: [
    CommonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatIcon,
    MatDividerModule,
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly firstName = new FormControl('', [Validators.required]);
  readonly lastName = new FormControl('', [Validators.required]);
  readonly password = new FormControl('', [Validators.required]);
  readonly confirmPassword = new FormControl('', [Validators.required]);
  readonly username = new FormControl('', [Validators.required]);

  constructor(public authHelper: AuthHelperService) {
    this.email.valueChanges.subscribe(() => {
      this.authHelper.updateErrorMessage(this.email);
    });
  }

  errorMessage = signal('');

  updateErrorMessage() {
    this.authHelper.updateErrorMessage(this.email);
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    console.log('Login clicked');
  }

  newUser() {
    console.log('New user clicked');
    // Here you would typically handle the registration logic, such as calling a service to create a new user.
    // For now, we just log to the console.
  }
}
