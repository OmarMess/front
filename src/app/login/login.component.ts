import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/Services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mail: string = '';
  password: string = '';
  error : string = '';
  constructor(private router: Router, private loginService : LoginService) {}

  login() {
    
    this.loginService.login(this.mail, this.password).subscribe(
      (response) => {
        // Handle successful login (e.g., store user info)
        console.log('Login successful', response);
        // Redirect or navigate to another page
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
        this.error = 'Invalid email or password.';
      }
    );
    
  }

 
}
