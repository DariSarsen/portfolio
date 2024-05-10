import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  login(email: string, password: string): void {
    const credentials = { email, password };
    this.authService.login(credentials)
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.token);
          this.toastr.success(response.message);
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Ошибка при аутентификации');
          console.error('Ошибка при аутентификации:', error);
        }
      });
  }
}