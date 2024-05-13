import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SendEmailService } from '../../services/send-email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private toastr: ToastrService, private router: Router, private sendEmail: SendEmailService) {}

  send(name: string, email: string, subject: string, message: string ): void {
    const form = { name, email, subject, message };
    this.sendEmail.send(form)
      .subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Ошибка при отправке');
          console.error('Ошибка при отправке:', error);
        }
      });
  }
}
