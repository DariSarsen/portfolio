import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editformproject',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './editformproject.component.html',
  styleUrl: './editformproject.component.css'
})
export class EditformprojectComponent {

}
