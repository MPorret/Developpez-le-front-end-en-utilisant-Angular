import { Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { HomeChartService } from 'src/app/core/services/home-chart.service';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';

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
  // Angular shall directly look after an instance of BaseChartDirective (chich is naturally the "canvas" containing pie chart)
  // Give also a reference to the chart component (to call this.chart.update())
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Subscription to encapsulate different subscription and easily unsubscribe when it takes over inside ngOnDestroy()
  private readonly subscription: Subscription = new Subscription();

  // ids & countries storage for routing
  public countries: { id: number; country: string }[] = [];

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
    private readonly router: Router,
    private readonly homeChartService: HomeChartService
  ) {}

  ngOnInit(): void {
    // Retrieve data from Olympic Service
    this.fetchData();

    // Subscription for retrieving chart labels
    this.subscription.add(
      this.homeChartService
        .getPieChartLabels()
        .subscribe((labels: string[]) => {
          this.homeChartService.pieChartData.labels = labels;
          if (this.chart) {
            this.chart.update();
          }
        })
    );

    // Subscription for retrieving charts medals data
    this.subscription.add(
      this.homeChartService
        .getPieMedalsByCountry()
        .subscribe((medals: number[]) => {
          this.homeChartService.pieChartData.datasets[0].data = medals;
          console.log(medals);
          if (this.chart) {
            this.chart.update();
          }
        })
    );

    // Susbcription for retrieving country list and their {id, name}
    this.subscription.add(
      this.olympicService.getOlympics().subscribe((olympics: Olympic[]) => {
        this.countries = olympics.map((o) => ({
          id: o.id,
          country: o.country,
        }));
      })
    );

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

  /**
   * Method called once there is a click on a pie chart
   * Retrieve pie index and navigate to selcted country page.
   * @param {any} event - event used to retrieve data to transfer to the country page
   */
  onChartClick(event: any): void {
    if (event.active && event.active.length > 0) {
      // event.active[0] contains selected informations once clicked
      // with "active" property
      const chartElement = event.active[0];
      const index = chartElement.index;

      // Retrieved country linked to id
      const selectedCountry = this.countries[index];
      if (selectedCountry) {
        // Navigate to URL '/country/<id>' by modifying the URL self
        this.router.navigate(['/country', selectedCountry.id]);
      }
    }
  }

  retry(): void {
    this.fetchData();
    this.subscription.unsubscribe();
  }
}
