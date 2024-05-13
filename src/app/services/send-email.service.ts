import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private apiUrl = 'http://localhost:3000/send-email';

  constructor(private http: HttpClient) { }

  send(form: any): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.post(url, form);
  }

}
