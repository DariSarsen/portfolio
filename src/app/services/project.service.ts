import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    return this.http.post<any>(this.apiUrl, project).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Произошла ошибка:', error);
        return this.handleErrorAndNavigate(error);
      })
    );
  }

  getProjectById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Произошла ошибка:', error);
        return this.handleErrorAndNavigate(error);
      })
    );
  }  

  updateProject(id: string, Project: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, Project).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Произошла ошибка:', error);
        return this.handleErrorAndNavigate(error);
      })
    );
  }

  deleteProject(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Произошла ошибка:', error);
        return this.handleErrorAndNavigate(error);
      })
    );
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
  
    // Это никогда не будет выполнено, но TypeScript требует возвращения Observable<never>
    return EMPTY;
  }
}







