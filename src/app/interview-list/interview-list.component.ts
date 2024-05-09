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

   ngOnInit() {
    this.getAllInterviews();
  }

  getAllInterviews(): void {
    this.interviewService.getAllInterviews()
      .subscribe(interviews => {
        this.interviews = interviews; // Assign all interviews to the interviews array
        console.log('component')
        console.log(this.interviews);
        this.plannedInterviews = interviews.filter(i => i.statutEntretien.toString() === 'Planned');
        this.evaluatedInterviews = interviews.filter(i => i.statutEntretien.toString() === 'Evaluated');
        this.reportedInterviews = interviews.filter(i => i.statutEntretien.toString() === 'Reported');
        this.cancelledInterviews = interviews.filter(i => i.statutEntretien.toString() === 'Cancelled');

      });
  }  
  

  downloadReport(reportUrl: string): void {
    window.open(reportUrl, '_blank');
  }

  changeStatus(interview: any, newStatus: string) {
    interview.statutEntretien = newStatus;
    //updateInterviewStatus;
  }

  onStatusChange(interview: EntretienTechnique): void {
    this.interviewService.updateInterviewStatus(interview.id, interview.statutEntretien)
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
