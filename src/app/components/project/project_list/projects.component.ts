import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProjectService } from '../../../services/project.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


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


  constructor(private projectService: ProjectService) { }
  
  ngOnInit(): void {
    this.getProjects();
    this.projectService.getProjectAddedObservable().subscribe(() => {
      this.getProjects();
    });
  }


  getProjects(): void {
    this.projectService.getProjects() 
      .subscribe(projects => {
        this.projects = projects;
        console.log("projects", projects)

      }); 
  }
  

  
}
