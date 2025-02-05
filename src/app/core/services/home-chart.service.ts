import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { OlympicService } from './olympic.service';

@Injectable({
  providedIn: 'root',
})
export class HomeChartService {
  constructor(private readonly olympicService: OlympicService) {}

  /**
   * Returns an observable of the pie chart labels (countries).
   * @returns {Observable<string[]>} An observable containing the pie chart labels.
   */
  getPieChartLabels(): Observable<string[]> {
    return this.olympicService.getOlympics().pipe(
      map((olympics) => olympics.map((o) => o.country)),
      catchError(() => of([]))
    );
  }

  /**
   * Returns an observable of the pie chart data for a specific country.
   * @param {number} id - The id of the country for which to fetch the pie chart data.
   * @returns {Observable<number[]>} An observable containing the pie chart data.
   */
  getPieMedalsByCountry(): Observable<number[]> {
    return this.olympicService.getOlympics().pipe(
      map((olympics) =>
        olympics.map((o) =>
          o.participations.reduce((acc, curr) => acc + curr.medalsCount, 0)
        )
      ),
      catchError(() => of([]))
    );
  }

  /**
   * Returns the value of a CSS variable.
   * @param {string} variableName - The name of the CSS variable.
   * @returns {string} The value of the CSS variable.
   */
  getCssVariableValue(variableName: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(
      variableName
    );
  }

  /**
   * Chart.js data object for the pie chart.
   * @type {ChartData<'pie', number[], string | string[]>}
   * @public
   * @memberof HomeChartService
   * @description The data object for the pie chart.
   * @property {string[]} labels - The labels for the pie chart.
   * @property {ChartDataSets<'pie', number[], string | string[]>[]} datasets - The datasets for the pie chart. Each dataset represents a country.
   */
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [], // filled inside the OnInit component method.
    datasets: [
      {
        data: [], //  Data for the pie chart
        type: 'pie', // Type of the dataset
        label: '🎖️', // Label for the dataset
        hidden: false, // Show the dataset by default
        indexAxis: 'y', // Display the data on the y-axis
        normalized: true, // Normalize the data values
        order: 1, // Order of the dataset in the chart
        rotation: 0, // Apply rotation to the pie slices in degrees
        spacing: 0, // Spacing between the pie slices
        transitions: {
          // Define the transitions for the dataset
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
        weight: 1, // Weight of the dataset in the chart
        borderColor: 'none',
        borderWidth: 0,
        hoverBorderColor: 'white',
        hoverBorderWidth: 1,
        backgroundColor: [
          this.getCssVariableValue('--italy-color'),
          this.getCssVariableValue('--spain-color'),
          this.getCssVariableValue('--united-states-color'),
          this.getCssVariableValue('--germany-color'),
          this.getCssVariableValue('--france-color'),
        ],
      },
    ],
  };

  public pieChartLegend = false;
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartType: ChartType = 'pie';
}
