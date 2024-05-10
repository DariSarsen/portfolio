import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PhotoUploadService } from '../../../services/photo-upload.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-addformproject',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './addformproject.component.html',
  styleUrl: './addformproject.component.css'
})
export class AddformprojectComponent {
  newProject: any = { title: '', description: '', subtitle: ''};
  selectedImages: File[] = [];

  constructor(private projectService: ProjectService, private toastr: ToastrService, private photoUploadService: PhotoUploadService) { }

  addProject(): void {
    // Проверяем, выбрано ли хотя бы одно изображение
    if (this.selectedImages.length === 0) {
      this.toastr.error('No images selected');
      return;
    }

    // Создаем новый FormData объект для передачи данных на сервер
    const formData = new FormData();
    formData.append('title', this.newProject.title);
    formData.append('subtitle', this.newProject.subtitle);
    formData.append('description', this.newProject.description);
    
    // Добавляем каждое изображение в FormData
    this.selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    // Вызываем метод сервиса для загрузки изображений
    this.photoUploadService.uploadPhotos(this.selectedImages)
      .pipe(
        catchError((error) => {
          this.toastr.error(error.error.message, 'Error uploading images');
          console.error('Error uploading images:', error);
          throw error; 
        })
      )
      .subscribe((response) => {
        // Получаем массив путей к загруженным изображениям и сохраняем его в объекте проекта
        this.newProject.imageUrls = response.imagePaths;
        
        // Вызываем метод сервиса для добавления проекта
        this.projectService.addProject(this.newProject)
          .pipe(
            catchError((error) => {
              this.toastr.error(error.error.message, 'Error adding project');
              console.error('Error adding project:', error);
              throw error; 
            })
          )
          .subscribe(() => {
            this.toastr.success('Project added successfully');
            // Очищаем форму и выбранные изображения
            this.newProject = { title: '', description: '', subtitle: ''};
            this.selectedImages = [];
          });
      });
  }

  // Обработчик события выбора изображений
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Добавляем выбранные изображения в массив
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }
    }
  }
}