import { Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { HomeChartService } from 'src/app/core/services/home-chart.service';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { ActiveElement } from 'chart.js/dist/plugins/plugin.tooltip';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
/**
 * Represents the Home component that displays Olympic data, statistics, and a pie chart.
 * This component also manages subscriptions for data retrieval from services.
 * @class
 * @implements {OnInit}
 */
export class HomeComponent implements OnInit {
  /**
   * ViewChild decorator to get a reference to the BaseChartDirective instance in the template.
   * This reference allows programmatic access and updates to the chart.
   * @type {BaseChartDirective | undefined}
   */
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  /**
   * Manages multiple subscriptions, allowing for easier cleanup when the component is destroyed.
   * @private
   * @type {Subscription}
   */
  private readonly subscription: Subscription = new Subscription();

  /**
   * An array of objects that stores each country's `id` and `country` name. 
   * This helps with routing to specific country details.
   * @type {Array<{ id: number; country: string }>}
   */
  public countries: { id: number; country: string }[] = [];

  /**
   * An observable containing the Olympic data array.
   * @type {Observable<Olympic[]>}
   */
  public olympics$!: Observable<Olympic[]>;

  /**
   * An observable containing the total number of countries.
   * @type {Observable<number>}
   */
  public getNumberOfCountry$!: Observable<number>;

  /**
   * An observable containing the total number of participations across all countries.
   * @type {Observable<number>}
   */
  public getNumberOfParticipation$!: Observable<number>;

  /**
   * An observable containing the average number of participations per country.
   * @type {Observable<number>}
   */
  public averageParticipations$!: Observable<number>;

  /**
   * An observable containing any potential error message emitted from the service.
   * @type {Observable<string | null>}
   */
  public error$!: Observable<string | null>;

  /**
   * Data for the pie chart, as required by the ng2-charts library.
   * @type {*}
   */
  public pieChartData: any;

  /**
   * Configuration options for the pie chart.
   * @type {*}
   */
  public pieChartOptions: any;

  /**
   * The chart type for the pie chart (e.g., 'pie', 'doughnut').
   * @type {*}
   */
  public pieChartType: any;

  /**
   * Determines whether the chart legend should be displayed.
   * @type {boolean}
   */
  public pieChartLegend = false;

  /**
   * Constructs a new HomeComponent.
   * @param {OlympicService} olympicService - Service used for fetching and managing Olympic data.
   * @param {Router} router - Router for navigation to other routes.
   * @param {HomeChartService} homeChartService - Service providing pie chart configuration and data.
   */
  constructor(
    private readonly olympicService: OlympicService,
    private readonly router: Router,
    private readonly homeChartService: HomeChartService
  ) {}

  /**
   * Lifecycle hook that is called after Angular has initialized the component.
   * Fetches data from the OlympicService, sets up subscriptions for the pie chart labels and data,
   * and initializes chart properties.
   */
  ngOnInit(): void {
    this.fetchData();

    // Subscription to retrieve chart labels
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

    // Subscription to retrieve chart medals data
    this.subscription.add(
      this.homeChartService
        .getPieMedalsByCountry()
        .subscribe((medals: number[]) => {
          this.homeChartService.pieChartData.datasets[0].data = medals;
          if (this.chart) {
            this.chart.update();
          }
        })
    );

    // Subscription to retrieve country list for routing
    this.subscription.add(
      this.olympicService.getOlympics().subscribe((olympics: Olympic[]) => {
        this.countries = olympics.map((o) => ({
          id: o.id,
          country: o.country,
        }));
      })
    );

    // Initialize pie chart properties
    this.pieChartData = this.homeChartService.pieChartData;
    this.pieChartOptions = this.homeChartService.pieChartOptions;
    this.pieChartType = this.homeChartService.pieChartType;
  }

  /**
   * Fetches data from OlympicService and initializes all relevant observables.
   * Also calculates the average number of participations by combining 
   * participation count and country count observables.
   */
  fetchData(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getNumberOfCountry$ = this.olympicService.getNumberOfCountry();
    this.getNumberOfParticipation$ = this.olympicService.getNumberOfParticipation();

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
   * The event from (chartClick) in the template might have 'active' as 'object[]'.
   * We accept that type and cast it to 'ActiveElement[]' as needed.
   *
   * @param chartClickArg - The object containing event info from ng2-charts
   */
  onChartClick(chartClickArg: { event?: ChartEvent; active?: object[] }): void {
    // Check if the active property exists and has at least one element
    // active property is an array of active elements on the chart
    // We are interested in the first element (index 0) of the array
    if (chartClickArg.active && chartClickArg.active.length > 0) {
      // Get the index of the clicked element
      const activeEls = chartClickArg.active as ActiveElement[];
      const index = activeEls[0].index;

      // Check if the index is valid
      const selectedCountry = this.countries[index];
      if (selectedCountry) {
        // Navigate to the country details page
        this.router.navigate(['/country', selectedCountry.id]);
      }
    }
  }

  /**
   * Retries fetching the data and unsubscribes from all active subscriptions to avoid memory leaks.
   */
  retry(): void {
    this.fetchData();
    this.subscription.unsubscribe();
  }
}
