import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/user';
import { UserService } from 'app/Services/user.service';

@Component({
  selector: 'profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  id: number;
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Parameter ID:', id); 
      this.id = id ? +id : null;
      console.log('Parsed ID:', this.id); 
      if (isNaN(this.id) || !this.id) {
        console.error('Invalid user ID:', this.id);
        return;
      }
      this.loadUserProfile();
    });
  }

  loadUserProfile(): void {
    this.userService.getUserById(this.id).subscribe(
      (user: User) => {
        this.user = user;
        this.profileForm.patchValue(user);
        console.log('User profile loaded:', user);
      },
      error => {
        console.error('Error loading user profile', error);
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      console.log('Updating user with data:', updatedUser);
      this.userService.updateUser({ ...updatedUser, id: this.id }).subscribe(
        response => {
          console.log('Profile updated successfully', response);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    } else {
      console.warn('Form is not valid');
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
