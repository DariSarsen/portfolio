import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error400Component } from './components/errors/error400/error400.component';
import { Error401Component } from './components/errors/error401/error401.component';
import { Error403Component } from './components/errors/error403/error403.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { Error500Component } from './components/errors/error500/error500.component';


export const errorRoutes:  Routes = [
  { path: '400', component: Error400Component, title: 'Bad Request' },
  { path: '401', component: Error401Component, title: 'Unauthorized' },
  { path: '403', component: Error403Component, title: 'Forbidden' },
  { path: '404', component: Error404Component, title: 'Not Found' },
  { path: '500', component: Error500Component, title: 'Internal Server Error' },
];