import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'app/Services/interview.service';
import { EntretienTechnique } from 'app/models/entretien-technique.model';

@Component({
  selector: 'interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {
 
  interviews: EntretienTechnique[] = [];
  plannedInterviews: EntretienTechnique[] = [];
  evaluatedInterviews: EntretienTechnique[] = [];
  reportedInterviews: EntretienTechnique[] = [];
  cancelledInterviews: EntretienTechnique[] = [];
  reportedDate: Date; 
  reportedTime: string; // Assuming reportedTime is a string


  constructor(private interviewService:InterviewService) { }
  
  getAllInterviews(): void {
    this.interviewService.getAllInterviews()
      .subscribe(interviews => {
        this.plannedInterviews = interviews.filter(i => i.statut_entretien.toString() === 'Planned');
        this.evaluatedInterviews = interviews.filter(i => i.statut_entretien.toString() === 'Evaluated');
        this.reportedInterviews = interviews.filter(i => i.statut_entretien.toString() === 'Reported');
        this.cancelledInterviews = this.interviews.filter(i => i.statut_entretien.toString() === 'Cancelled');
      });
  }
  ngOnInit() {
    this.interviewService.getInterviewByStatus('PLANNED');
  }

  downloadReport(reportUrl: string): void {
    window.open(reportUrl, '_blank');
  }

  onStatusChange(interview: EntretienTechnique): void {
    this.interviewService.updateInterviewStatus(interview.id, interview.statut_entretien)
      .subscribe(
        response => {
          console.log('Status updated successfully:', response);
        },
        error => {
          console.error('Error updating status:', error);
        }
      );
  }

  updateReportedDateTime(interview: EntretienTechnique): void {
    const reportedDateTime = new Date(this.reportedDate + ' ' + this.reportedTime);
    this.interviewService.updateReportedDateTime(interview.id, reportedDateTime)
      .subscribe(
        response => {
          console.log('Reported date and time updated successfully:', response);
        },
        error => {
          console.error('Error updating reported date and time:', error);
        }
      );
  }
}
