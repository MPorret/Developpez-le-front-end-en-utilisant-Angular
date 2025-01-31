import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

/** Home component that displays the Olympic data and statistics.
 * @class HomeComponent
 * @implements {OnInit}
 *
 * @property {Observable<Olympic[]>} olympics$ - An observable containing the Olympic data.
 * @property {Observable<number>} getNumberOfCountry$ - An observable containing the number of countries.
 * @property {Observable<number>} getNumberOfParticipation$ - An observable containing the number of participations.
 * @property {Observable<number>} averageParticipations$ - An observable containing the average number of participations per country.
 * @property {Observable<string | null>} error$ - An observable containing the error message.
 * @property {Observable<string[]>} pieChartLabels$ - An observable containing the pie chart labels.
 * @property {Observable<number[]>} pieChartData$ - An observable containing the pie chart data.
 *! Used | async pipe in the template to subscribe to the observables & display the data without needing to unsubscribe.
 ** https://angular.fr/pipes/async
 */
export class HomeComponent implements OnInit {
  // Define the properties for the observables
  public olympics$!: Observable<Olympic[]>;
  public getNumberOfCountry$!: Observable<number>;
  public getNumberOfParticipation$!: Observable<number>;
  public averageParticipations$!: Observable<number>;
  public error$!: Observable<string | null>;
  
  // Define the properties for the pie chart
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        data: [30, 50, 20, 60, 75],
        borderColor: 'black',
        borderWidth: 1,
        hoverBorderColor: 'black',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
        ],
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  }

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  constructor(private readonly olympicService: OlympicService) {}


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    try {
      this.olympics$ = this.olympicService.getOlympics();
      this.getNumberOfCountry$ = this.olympicService.getNumberOfCountry();
      this.getNumberOfParticipation$ =
        this.olympicService.getNumberOfParticipation();
        // this.pieChartLabels$ = this.olympicService.getPieChartLabels();

      // combineLatest is used to combine multiple observables into a single observable that emits an array of values.
      this.averageParticipations$ = combineLatest([
        this.getNumberOfParticipation$,
        this.getNumberOfCountry$,
      ]).pipe(
        map(([participations, countries]) =>
          countries > 0 ? participations / countries : 0
        )
      );

    } catch (error) {
      this.error$ = this.olympicService.getError();
    }
  }

  retry(): void {
    this.fetchData();
  }
}
