import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  project: any[] = []; 

  constructor(private projectService: ProjectService) { }

  
  ngOnInit(): void {
    // this.projectService.getProjectAddedObservable().subscribe(() => {
    //   this.project = ;
    // });
  }


  deleteProject(id: string): void {
  //   this.projectService.deleteProject(id)
  //     .subscribe(() => {
  //       this.projects = this.projects.filter(task => task._id !== id);
  //     });
  }
 

}
