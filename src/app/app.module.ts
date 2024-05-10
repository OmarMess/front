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
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
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
    UnauthorizedComponent,

  ],
  providers: [
    InterviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
