import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects'; 
  private ProjectAddedSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProject(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project).pipe(
      tap(() => this.ProjectAddedSubject.next())
    );
  }

  getProjectAddedObservable(): Observable<void> {
    return this.ProjectAddedSubject.asObservable();
  }

  updateProject(id: string, Project: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, Project);
  }

  deleteProject(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}







