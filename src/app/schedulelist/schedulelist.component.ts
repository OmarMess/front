import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../Services/schedule.service';
import { Schedule } from 'app/models/schedule.model';
import { LoginService } from 'app/Services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedulelist.component.html',
  styleUrls: ['./schedulelist.component.css']
})
export class ScheduleListComponent implements OnInit {

  schedules: Schedule[] = [];
  errorMessage: string = '';
  isManager: boolean = false;
  evaluatorId: number | undefined;
  evaluatedScheduleId: number | null = null;

  constructor(
    private scheduleService: ScheduleService,
    private loginService: LoginService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.loadSchedules();

  }

  checkUserRole(): void {
    const user = this.loginService.getCurrentUser(); 
    if (user) {
      this.isManager = user.role === 'Manager'; 
      if (!this.isManager) {
        this.evaluatorId = user.id; 
      }
    }
  }

  loadSchedules(): void {
    if (this.isManager) {
      this.scheduleService.getSchedules().subscribe(
        (data: Schedule[]) => this.schedules = data,
        error => this.errorMessage = 'An error occurred while fetching schedules.'
      );
    } else if (this.evaluatorId) {
      this.scheduleService.getSchedulesByEvaluatorId(this.evaluatorId).subscribe(
        (data: Schedule[]) => this.schedules = data,
        error => this.errorMessage = 'An error occurred while fetching schedules.'
      );
    }
  }

  evaluate(scheduleId: number): void {
    this.router.navigate([`/evaluation/${scheduleId}`]);
  }
}
