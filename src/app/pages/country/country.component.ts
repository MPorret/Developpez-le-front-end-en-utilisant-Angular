import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

/**
 * CountryComponent is responsible for displaying detailed information
 * about a single country's Olympic participations, medals, and athletes.
 */
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  /**
   * An Observable that emits the current country's Olympic data (or undefined if no ID is provided).
   * @type {Observable<Olympic | undefined>}
   */
  public countryData$!: Observable<Olympic | undefined>;

  /**
   * Stores the total number of participations for the current country.
   * @type {number}
   */
  public totalParticipations: number = 0;

  /**
   * Stores the total number of medals for the current country.
   * @type {number}
   */
  public totalMedals: number = 0;

  /**
   * Stores the total number of athletes for the current country.
   * @type {number}
   */
  public totalAthletes: number = 0;

  /**
   * Chart.js data object for the line chart showing medals by year.
   * @type {ChartData<'line'>}
   */
  public lineChartData!: ChartData<'line'>;

  /**
   * Chart.js configuration options for the line chart.
   * @type {ChartOptions<'line'>}
   */
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  /**
   * The type of chart to display, provided by Chart.js.
   * @type {ChartType}
   */
  public lineChartType: ChartType = 'line';

  /**
   * Creates a new instance of CountryComponent.
   * @param {ActivatedRoute} route - ActivatedRoute to retrieve route parameters.
   * @param {OlympicService} olympicService - Service to fetch Olympic data.
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly olympicService: OlympicService
  ) {}

  /**
   * Lifecycle hook that is called after Angular has initialized the component.
   * Subscribes to the route parameter and retrieves the country's data if an ID is present.
   * It also calculates total participations, medals, and athletes for the specified country
   * and initializes chart data accordingly.
   * @returns {void}
   */
  ngOnInit(): void {
    // paramMap is an Observable that contains a map of the required and optional parameters specific to the route.
    this.countryData$ = this.route.paramMap.pipe( 
      // switchMap is used to map the values emitted by the source observable to a new observable and get its last emitted observable.
      // switchmap catches the parameter emitted by the paramMap observable from URL and returns a new observable with this value.
      switchMap((params) => {
        const idParam = params.get('id');
        if (idParam) {
          const countryId = +idParam;
          // here we have the new observable returned by the switchMap operator.
          return this.olympicService.getOlympicById(countryId);
        }
        return of(undefined);
      })
    );

    this.countryData$.subscribe((country) => {
      if (country) {
        this.totalParticipations = country.participations.length;

        this.totalMedals = country.participations.reduce(
          (sum, participation) => sum + participation.medalsCount,
          0
        );
        this.totalAthletes = country.participations.reduce(
          (sum, participation) => sum + participation.athleteCount,
          0
        );

        const years = country.participations.map(
          (participation) => participation.year
        );
        const medals = country.participations.map(
          (participation) => participation.medalsCount
        );

        this.lineChartData = {
          labels: years,
          datasets: [
            {
              label: 'Medals per Participation',
              data: medals,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'lightblue',
              tension: 0,
              type: 'line',
              normalized: true,
              segment: {
                borderColor: 'red',
                borderWidth: 2,
                borderJoinStyle: 'round',
                borderCapStyle: 'butt',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
              },
              transitions: {
                show: {
                  animation: {
                    duration: 1000,
                    easing: 'easeOutBounce',
                  },
                },
                hide: {
                  animation: {
                    duration: 1000,
                    easing: 'easeOutBounce',
                  },
                },
              },
            },
          ],
        };
      }
    });
  }
}
