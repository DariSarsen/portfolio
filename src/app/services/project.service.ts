import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects'; 

  constructor(private http: HttpClient, private router: Router) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleErrorAndNavigate.bind(this))
    );
  }

  getProjectById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleErrorAndNavigate.bind(this))
    );
  }  

  updateProject(id: string, project: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, project, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleErrorAndNavigate.bind(this))
    );
  }

  deleteProject(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleErrorAndNavigate.bind(this))
    );
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  private handleErrorAndNavigate(error: HttpErrorResponse): Observable<never> {
    const errorRoutes: { [key: number]: string } = {
      400: 'error/400',
      401: 'error/401',
      403: 'error/403',
      404: 'error/404',
      500: 'error/500'
    };

    const route = errorRoutes[error.status];
    if (route) {
      this.router.navigate([route]);
    } else {
      throw error;
    }

    return EMPTY;
  }
}
