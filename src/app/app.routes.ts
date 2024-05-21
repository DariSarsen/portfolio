import { Routes } from '@angular/router';
import {AboutMeComponent} from './components/about-me/about-me.component';
import {ContactComponent} from './components/contact/contact.component';
import {ProjectsComponent} from './components/project/project_list/projects.component';
import {AddformprojectComponent} from './components/project/addformproject/addformproject.component';
import {EditformprojectComponent} from './components/project/editformproject/editformproject.component';
import {ResumeComponent} from './components/resume/resume.component';
import {LoginComponent} from './components/login/login.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { 
        path: 'error', 
        loadChildren: () => import('./error.routes').then(m => m.errorRoutes)
    },
    { path: '', component: AboutMeComponent, title: 'Darina Sarsenova'},
    { path: 'contact', component: ContactComponent, title: 'Contact with me' },
    { path: 'projects', component: ProjectsComponent, title: 'Projects' },
    { path: 'projects/addnew', component: AddformprojectComponent, title: 'Add New Project', canActivate: [AuthGuard] },
    { path: 'projects/edit/:projectId', component: EditformprojectComponent, title: 'Edit Project', canActivate: [AuthGuard] },
    { path: 'resume', component: ResumeComponent, title: 'Resume' },
    { path: 'login', component: LoginComponent, title: 'Admin Register' },
    { path: '**', component: Error404Component, title: 'Not Found' },
];
