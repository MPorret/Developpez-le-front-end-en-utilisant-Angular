import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { HomeChartService } from 'src/app/core/services/home-chart.service';

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
  public pieChartData: any;
  public pieChartOptions: any;
  public pieChartPlugins: any;
  public pieChartType: any;
  public pieChartLegend = false;

  constructor(
    private readonly olympicService: OlympicService,
    private readonly homeChartService: HomeChartService
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.pieChartData = this.homeChartService.pieChartData;
    this.pieChartOptions = this.homeChartService.pieChartOptions;
    this.pieChartPlugins = this.homeChartService.pieChartPlugins;
    this.pieChartType = this.homeChartService.pieChartType;
  }

  fetchData(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getNumberOfCountry$ = this.olympicService.getNumberOfCountry();
    this.getNumberOfParticipation$ =
      this.olympicService.getNumberOfParticipation();

    // combineLatest is used to combine multiple observables into a single observable that emits an array of values.
    this.averageParticipations$ = combineLatest([
      this.getNumberOfParticipation$,
      this.getNumberOfCountry$,
    ]).pipe(
      map(([participations, countries]) =>
        countries > 0 ? participations / countries : 0
      )
    );
  }

  retry(): void {
    this.fetchData();
  }
}
