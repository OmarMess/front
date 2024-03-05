import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor() {}

  resetPassword() {
    // Implement logic to send reset password email
    console.log('Reset password email sent to:', this.email);
  }
}
