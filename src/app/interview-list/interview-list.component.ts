import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'app/Services/interview.service';

@Component({
  selector: 'interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {
  constructor(private interviewService:InterviewService) { }

  ngOnInit() {
  }

}
