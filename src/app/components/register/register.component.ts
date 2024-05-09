import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  credentials = { login: '', password: '' };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/admin/register', this.credentials).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }
}
