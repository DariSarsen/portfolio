import { Routes } from '@angular/router';
import {AboutMeComponent} from './components/about-me/about-me.component';
import {ContactComponent} from './components/contact/contact.component';
import {ProjectsComponent} from './components/project/project_list/projects.component';
import {ProjectComponent} from './components/project/project/project.component';
import {AddformprojectComponent} from './components/project/addformproject/addformproject.component';
import {EditformprojectComponent} from './components/project/editformproject/editformproject.component';
import {ResumeComponent} from './components/resume/resume.component';
import {RegisterComponent} from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: AboutMeComponent, title: 'Darina Sarsenova' },
    { path: 'contact', component: ContactComponent, title: 'Contact with me' },
    { path: 'projects', component: ProjectsComponent, title: 'Projects' },
    { path: 'projects/projectId', component: ProjectComponent, title: 'My project' },
    { path: 'projects/addnew', component: AddformprojectComponent, title: 'Add New Project' },
    { path: 'projects/edit/projectId', component: EditformprojectComponent, title: 'Edit Project' },
    { path: 'resume', component: ResumeComponent, title: 'Resume' },
    { path: 'register', component: RegisterComponent, title: 'Admin Register' },
    { path: '**', component: AboutMeComponent, title: 'Darina Sarsenova' }, //PageNotFoundComponent
];
