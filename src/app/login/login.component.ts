import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/Services/login.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mail: string = '';
  password: string = '';
  error : string = '';
  role : string = ''
  constructor(private router: Router, private loginService : LoginService, private toastr: ToastrService) {}

  login() {
    
    this.loginService.login(this.mail, this.password).subscribe(
      (response) => {
        // Handle successful login (e.g., store user info)
        console.log('Login successful', response);
        // Redirect or navigate to another page
        this.toastr.success('Login successful', 'Success');
        switch (response.role){
          case 'Manager':
            localStorage.setItem("connectedProfil",response.role)
            this.router.navigate(['/dashboard']);
            break;
          case 'Evaluateur':
            localStorage.setItem("connectedProfil",response.role)
            this.router.navigate(['/schedulelist']);
            break;
          default:
            this.router.navigate(['/default-dashboard']);

        }

        
        
      },
      (error) => {
        console.error('Login failed', error);
        this.error = 'Invalid email or password.';
        this.toastr.error('Invalid email or password.', 'Error');

      }
    );
    
  }

 // Customize Toastr options
//  toastrOptions(): Partial<IndividualConfig> {
//   return {
//     timeOut: 3000,
//     progressBar: true,
//     closeButton: true,
//     enableHtml: true,
//     positionClass: 'toast-top-center',
//     // Other options you may want to customize
//   };
// }
}
