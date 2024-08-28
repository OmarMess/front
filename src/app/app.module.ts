import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import {InterviewService} from './Services/interview.service';


import { ToastrModule } from 'ngx-toastr';
import { LoginService } from './Services/login.service';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { NotifComponent } from './notif/notif.component';
import { ScheduleListComponent } from './schedulelist/schedulelist.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';

//import { UnauthorizedComponent } from './unauthorized/Unauthorized.component';
@NgModule({
  imports: [
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center' // Set position to top-center
    }),
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ScheduleFormComponent,
    NotifComponent,
    ScheduleListComponent,
    ProfilUserComponent,
    EvaluationFormComponent,
    EvaluationListComponent,
    //UnauthorizedComponent,
  ],
  providers: [
    InterviewService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
