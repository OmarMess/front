import { Component, OnInit } from '@angular/core';
import { CandidatServiceService } from 'app/Services/candidat-service.service';
import { EvaluationService } from 'app/Services/evaluation.service';
import { Candidat } from 'app/models/candidat.model';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fullstackCount: number = 0;
  backendCount: number = 0;
  frontendCount: number = 0;
  javaCount: number = 0;
  phpCount: number = 0;

  successCount: number = 0;
  failedCount: number = 0;

  candidats: Candidat[] = [];
  fullstackCandidats: Candidat[] = [];
  backendCandidats: Candidat[] = [];
  frontendCandidats: Candidat[] = [];
  javaCandidats: Candidat[] = [];
  constructor(private candidatService: CandidatServiceService , private evaluationService: EvaluationService) { }


  getAllCandidates(): void {
    this.candidatService.getAllCandidates()
      .subscribe(candidates => {
        this.fullstackCandidats = candidates.filter(c => c.profil.toString() === 'FULLSTUCK');
        this.backendCandidats = candidates.filter(c => c.profil.toString() === 'BACKEND');
        this.javaCandidats = candidates.filter(c => c.profil.toString() === 'JAVA');
        this.frontendCandidats = candidates.filter(c => c.profil.toString() === 'FRONTEND');
      });
  }


  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

  ngOnInit() {
    this.evaluationService.getProfileCounts().subscribe(counts => {
      this.fullstackCount = counts['FULLSTACK'];
      this.backendCount = counts['BACKEND'];
      this.frontendCount = counts['FRONTEND'];
      this.javaCount = counts['JAVA'];
      this.phpCount = counts['PHP'];
    });

    this.evaluationService.getStateCounts().subscribe(counts => {
      this.successCount = counts['SUCCESS'];
      this.failedCount = counts['FAILED'];
    });

    
    console.log("je suis dans dashboard");
    console.log("profil dans dashboard==",localStorage.getItem("connectedProfil"))
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
      
      
      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);

      this.getAllCandidates();
  }

  /*getCandidatesCountByProfile(): void {
    this.candidatService.getCandidatesByProfilez('FULLSTACK')
      .subscribe(candidates => {
        if (candidates) {
          this.fullstackCount = candidates.length;
        } else {
          this.fullstackCount = 0;       
         }
      });
  }*/

 
  
  }

