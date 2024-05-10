import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { TableListComponent } from './table-list/table-list.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ManagerGuard } from './manager.guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },

  {
    path:'dashboard',
    component: DashboardComponent,
    redirectTo: '/dashboard',
    canActivate: [ManagerGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'interviewlist', component: InterviewListComponent },
  { path: 'unauthorized', component: UnauthorizedComponent }, // Route for unauthorized page

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
      },
    
  ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
