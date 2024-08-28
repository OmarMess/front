import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EvaluationService } from '../Services/evaluation.service';
import { LoginService } from '../Services/login.service';
import { ScheduleService } from '../Services/schedule.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NiveauEtudes } from 'app/enums/niveau-etudes'; 
import { Niveau } from 'app/enums/niveau'; 
import { Profil } from 'app/enums/profil'; 
import { Avis } from 'app/enums/avis'; 
import { State } from 'app/enums/state.enum';


@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm: FormGroup;
  niveauEtudesOptions = Object.values(NiveauEtudes);
  niveauxOptions = Object.values(Niveau);
  profilsOptions = Object.values(Profil);
  avisOptions = Object.values(Avis);
  statesOptions = Object.values(State);

  currentUser: any;
  candidate: any;
  scheduleId: number | undefined;
  
  
  

  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService,
    private loginService: LoginService,
    private scheduleService: ScheduleService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {
    this.evaluationForm = this.fb.group({
      candidateNom: [''],
      candidatePrenom: [''],
      candidateEmail: [''],
      evaluatorNom: [''],
      evaluatorPrenom: [''],
      evaluatorEmail: [''],
      niveauEtudes: ['', Validators.required],
      annee: ['', Validators.required],
      intitule: ['', Validators.required],
      specialite: ['', Validators.required],
      experience: ['', Validators.required],
      competences: this.fb.array([]), 
      profil: ['', Validators.required],
      avis: ['', Validators.required],
      notes: ['', Validators.required],
      state: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadCandidateDetails();
    this.addCompetence(); 
    this.scheduleId = +this.route.snapshot.paramMap.get('id')!;
  }
  
  get competences(): FormArray {
    return this.evaluationForm.get('competences') as FormArray;
  }
  
  addCompetence(): void {
    const competenceFormGroup = this.fb.group({
      technologie: ['', Validators.required], 
      niveau: ['', Validators.required] 
    });
    this.competences.push(competenceFormGroup);
  }
  
  onSubmit(): void {
    if (this.evaluationForm.valid) {
      console.log(this.evaluationForm.get('competences')?.value);
      this.evaluationService.createEvaluation(this.evaluationForm.value,this.scheduleId).subscribe(
        response => {
          console.log('Evaluation submitted successfully', response);
          alert('Evaluation submitted successfully');
        },
        error => {
          console.error('Error submitting evaluation', error);
  
        }
      );
    }
  }

  private loadCurrentUser(): void {
    this.currentUser = this.loginService.getCurrentUser();
    this.evaluationForm.patchValue({
      evaluatorNom: this.currentUser.nom,
      evaluatorPrenom: this.currentUser.prenom,
      evaluatorEmail: this.currentUser.mail
    });
  }

  private loadCandidateDetails(): void {
    const scheduleId = +this.route.snapshot.paramMap.get('id')!;
    this.scheduleService.getScheduleById(scheduleId).subscribe(schedule => {
      this.candidate = schedule;
      this.evaluationForm.patchValue({
        candidateNom: schedule.nom,
        candidatePrenom: schedule.prenom,
        candidateEmail: schedule.email
      });
    });
  }

}
