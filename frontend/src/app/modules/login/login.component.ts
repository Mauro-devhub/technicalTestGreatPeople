import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './services/auth.service';
import { FormLoginComponent } from '../shared/components/form-login/form-login.component';

@Component({
  selector: 'login-page',
  imports: [
    FormLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    console.log('Page login loaded');
  }

  async loginUser(user: LoginUserDto): Promise<void> {
    this.isLoading.set(true);

    this.authService.loginUser(user).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.error('Error during login:', err);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}