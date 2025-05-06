import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { passwordsMatch } from '../validators/password-match.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: false,
})
export class SignupComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private userService = inject(UserService);
  isLoading = false;
  signupSuccess = false;
  errorMessage = '';
  signupForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: passwordsMatch('password', 'confirmPassword'),
    }
  );

  onSignup() {
    this.isLoading = true;
    this.signupSuccess = false;
    this.errorMessage = '';
    const formValue = this.signupForm.getRawValue();
    const user = {
      email: formValue.email,
      password: formValue.password,
    };
    this.userService.signup(user).subscribe({
      next: () => {
        this.isLoading = false;
        this.signupSuccess = true;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.msg ?? 'An error occurred!';
      },
    });
  }
}
