import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../Services/schedule.service';
import { User } from 'app/models/user';
import { UserService } from 'app/Services/user.service';


@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {
  scheduleForm: FormGroup;
  evaluators: User[] = []; 

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private userService: UserService 
  ) {
    this.scheduleForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      evaluatorId: ['', Validators.required],
      date: ['', Validators.required],
      meetinglink: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.loadEvaluators();
  }

  loadEvaluators(): void {
    this.userService.findEvaluators().subscribe(
      evaluators => {
        this.evaluators = evaluators;
        console.log('Evaluators loaded:', this.evaluators);
      },
      error => {
        console.error('Error loading evaluators:', error);
      }
    );
  }

  
  onSubmit(): void {
    console.log('Form valid:', this.scheduleForm.valid);
    if (this.scheduleForm.valid) {
      this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
        response => {
          alert('Schedule created successfully');
          console.log('Schedule created:', response);
        },
        error => {
          alert('Failed to create schedule');
          console.error('Error creating schedule:', error);
          
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
