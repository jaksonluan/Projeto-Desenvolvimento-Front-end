import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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
import { MatDividerModule } from '@angular/material/divider';
import { AuthHelperService } from '../service/auth-helper.service';
import { FakeAuthService } from '../service/fake-auth.service';

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
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly firstName = new FormControl('', [Validators.required]);
  readonly lastName = new FormControl('', [Validators.required]);
  readonly password = new FormControl('', [Validators.required]);
  readonly confirmPassword = new FormControl('', [Validators.required]);
  readonly username = new FormControl('', [Validators.required]);

  errorMessage = signal('');
  hide = signal(true);

  constructor(
    public authHelper: AuthHelperService,
    private fakeAuth: FakeAuthService,
    private router: Router
  ) {
    this.email.valueChanges.subscribe(() => {
      this.authHelper.updateErrorMessage(this.email);
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    this.authHelper.updateErrorMessage(this.email);
  }

  newUser() {
    if (
      this.email.invalid ||
      this.firstName.invalid ||
      this.lastName.invalid ||
      this.username.invalid ||
      this.password.invalid ||
      this.confirmPassword.invalid
    ) {
      this.errorMessage.set('Please fill in all fields correctly.');
      return;
    }

    if (this.password.value !== this.confirmPassword.value) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    const success = this.fakeAuth.register(this.email.value!, this.password.value!);

    if (success) {
      this.errorMessage.set('');
      alert('Registration successful! You can now log in.');
      this.router.navigate(['/login']);
    } else {
      this.errorMessage.set('User with this email already exists.');
    }
  }

  login() {
    console.log('Login clicked');
  }
}
