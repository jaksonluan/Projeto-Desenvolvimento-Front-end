import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthHelperService } from '../service/auth-helper.service';
import { FakeAuthService } from '../service/fake-auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-login',
  standalone: true,
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
    MatDividerModule,
    MatIcon,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = signal(true);

  readonly email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
  ]);
  readonly password = new FormControl('', [Validators.required]);

  errorMessage = signal('');
  submitted = signal(false); // <-- controle para mostrar erro só após tentar login

  constructor(
    public authHelper: AuthHelperService,
    private fakeAuth: FakeAuthService,
    private router: Router
  ) {
    this.email.valueChanges.subscribe(() => this.clearErrorIfValid());
    this.password.valueChanges.subscribe(() => this.clearErrorIfValid());
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clearErrorIfValid() {
    if (this.email.valid && this.password.valid && this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  getErrorMessage(): string {
    if (
      this.submitted() && // só mostrar erro após tentar login
      ((this.email.invalid && (this.email.dirty || this.email.touched)) ||
       (this.password.invalid && (this.password.dirty || this.password.touched)))
    ) {
      if (this.email.errors) {
        if (this.email.errors['required']) return 'Email is required.';
        if (this.email.errors['email'] || this.email.errors['pattern'])
          return 'Please enter a valid email address.';
      }
      if (this.password.errors) {
        if (this.password.errors['required']) return 'Password is required.';
      }
    }
    return '';
  }

  isLoading = signal(false);
  login() {
    this.submitted.set(true);

    if (this.email.invalid || this.password.invalid) {
      this.errorMessage.set('Please fill in all fields with valid information.');
      return;
    }

    const sucesso = this.fakeAuth.login(this.email.value!, this.password.value!);

    if (sucesso) {
      this.errorMessage.set('');
      this.isLoading.set(true);

      // Mostra o spinner por 2 segundos antes de redirecionar
      setTimeout(() => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      }, 5000);
    } else {
      this.errorMessage.set('Invalid username or password.');
    }
  }

register() {
  this.submitted.set(true);

  if (this.email.invalid || this.password.invalid) {
    this.errorMessage.set('Please fill in all fields with valid information.');
    return;
  }

  const success = this.fakeAuth.register(this.email.value!, this.password.value!);

  if (success) {
    this.errorMessage.set('');
    alert('Registration successful! You can now log in.');
    // opcional: redirecionar para login ou dashboard
  } else {
    this.errorMessage.set('User with this email already exists.');
  }
}

}