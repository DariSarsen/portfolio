import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProjectService } from '../../../services/project.service'; 
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class ProjectsComponent implements OnInit {
  projects: any | null = null;
  slideIndex = 1;


  constructor(private projectService: ProjectService, private toastr: ToastrService, private router: Router) { }
  
  ngOnInit(): void {
    this.getProjects();
  }


  getProjects(): void {
    this.projectService.getProjects() 
      .subscribe(projects => {
        this.projects = projects;
        console.log("projects", projects)
      }); 
  }
  
  editProject(id: string): void {
    this.router.navigate(['/projects/edit', id]);
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id)
      .subscribe(() => {
        this.toastr.success('Project removed successfully');  
        this.getProjects();
      });
  }
}
