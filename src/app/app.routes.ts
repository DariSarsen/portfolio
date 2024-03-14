import { Routes } from '@angular/router';
import {AboutMeComponent} from './components/about-me/about-me.component';
import {ContactComponent} from './components/contact/contact.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ResumeComponent} from './components/resume/resume.component';

export const routes: Routes = [
    { path: '', component: AboutMeComponent, title: 'Darina Sarsenova' },
    { path: 'contact', component: ContactComponent, title: 'Contact with me' },
    { path: 'projects', component: ProjectsComponent, title: 'Projects' },
    { path: 'resume', component: ResumeComponent, title: 'Resume' },
    { path: '**', component: AboutMeComponent, title: 'Darina Sarsenova' }, //PageNotFoundComponent
];
