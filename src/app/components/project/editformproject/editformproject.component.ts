import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { PhotoUploadService } from '../../../services/photo-upload.service';


@Component({
  selector: 'app-editformproject',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './editformproject.component.html',
  styleUrl: './editformproject.component.css'
})
export class EditformprojectComponent implements OnInit {
  editedProject: any = {};
  projectId: string = '';
  selectedImages: File[] = [];

  constructor(private router: Router, private route: ActivatedRoute,  private toastr: ToastrService, private projectService: ProjectService, private photoUploadService: PhotoUploadService) { }

  ngOnInit(): void {
    const projectIdParam = this.route.snapshot.paramMap.get('projectId'); // Получаем projectId из URL
    if (projectIdParam !== null) {
      this.projectId = projectIdParam;
      this.getProjectDetails();
    } else {
      console.error('Project ID is missing from URL');
    }
  }
  

  getProjectDetails(): void {
    this.projectService.getProjectById(this.projectId)
      .subscribe(project => {
        this.editedProject = project;
        this.selectedImages = project.imageUrls;

      });
  }

  updateThisProject(): void {
    this.photoUploadService.uploadPhotos(this.selectedImages)
      .pipe(
        catchError((error) => {
          this.toastr.error(error.error.message, 'Error uploading images');
          console.error('Error uploading images:', error);
          throw error; 
        })
      )
      .subscribe((response) => {
        if(Object.keys(response.imagePaths).length > 0){
          console.log("images path", response.imagePaths)
          this.editedProject.imageUrls = response.imagePaths;
        }else{
          console.log("selected images")
          this.editedProject.imageUrls = this.selectedImages;
        }
        
        // Вызываем метод сервиса для редактирования проекта
        this.projectService.updateProject(this.projectId, this.editedProject)
      .subscribe({
        next: () => {
          this.toastr.success('Project has been edited successfully');
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Error when editing project');
          console.error('Error updating task:', error);
        }
      });
      });
  }

  onFileSelected(event: any): void {
    this.selectedImages = []
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }
    }
  }
}