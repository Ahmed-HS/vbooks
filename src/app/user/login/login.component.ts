import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  isLoading = false;
  errorMessage = '';
  onLogin(form: NgForm) {
    const UserLogin = form.value;
    this.isLoading = true;
    this.errorMessage = '';
    this.userService.login(UserLogin).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        const user = {
          id: response.user.id,
          email: UserLogin.email,
          accessToken: response.access_token,
          expiresAt: response.expires_at,
        };
        this.userService.setCurrentUser(user);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password!';
      },
    });
  }
}
