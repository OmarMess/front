import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ScheduleListComponent } from './schedulelist/schedulelist.component';
import { ProfilUserComponent } from './profil-user/profil-user.component'
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'schedule-interview', component: ScheduleFormComponent },
      { path: 'interview-list', component: InterviewListComponent },
      { path: 'notifications', component: NotificationsComponent},
      { path: 'schedulelist', component: ScheduleListComponent},
      { path: 'profile-user/:id', component: ProfilUserComponent},
      { path: 'evaluation/:id', component: EvaluationFormComponent },
      { path: 'evaluations', component: EvaluationListComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
