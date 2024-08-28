import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../Services/evaluation.service';
import { Evaluation } from '../models/evaluation.model';
import { LoginService } from '../Services/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit {

  evaluations: Evaluation[] = [];
  currentUserEmail: string = '';

  constructor(
    private evaluationService: EvaluationService,
    private loginService: LoginService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.currentUserEmail = this.loginService.getCurrentUser().mail;
    this.fetchEvaluations();
  }

  fetchEvaluations(): void {
    if (this.loginService.isManager()) {
      this.evaluationService.getAllEvaluations().subscribe(
        data => {
          this.evaluations = data;
        },
        error => {
          console.error('Error fetching evaluations:', error);
        }
      );
    } else {
      this.evaluationService.getEvaluationsByEvaluatorEmail(this.currentUserEmail).subscribe(
        data => {
          this.evaluations = data;
        },
        error => {
          console.error('Error fetching evaluations:', error);
        }
      );
    }
  }

  downloadReport(evaluationId: number) {
    this.evaluationService.downloadReport(evaluationId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'evaluation_report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Failed to download report', error);
    });
  }
}
