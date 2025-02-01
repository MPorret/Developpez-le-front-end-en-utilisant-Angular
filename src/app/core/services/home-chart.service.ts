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
  getPieChartDataByCountry(id: number): Observable<number[]> {
    return this.olympicService.getOlympics().pipe(
      map((olympics) => {
        const olympic = olympics.find((o) => o.id === id);
        return olympic ? olympic.participations.map((p) => p.medalsCount) : [];
      }),
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

  // Define the properties for the pie chart
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        data: [30, 50, 20, 60, 75], //  Data for the pie chart
        type: 'pie', // Type of the dataset
        label: '$', // Label for the dataset
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
        hoverBorderColor: 'black',
        hoverBorderWidth: 1,
        backgroundColor: [
          this.getCssVariableValue('--italy-color'),
          this.getCssVariableValue('--spain-color'),
          this.getCssVariableValue('--united-states-color'),
          this.getCssVariableValue('--germany-color'),
          this.getCssVariableValue('--france-color'),
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
    // xLabels and yLabels are used to display the labels on the x-axis and y-axis respectively
    xLabels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    yLabels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  };

  public pieChartLegend = false;
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [
    {
      beforeDraw(chart: any) {
        const ctx = chart.ctx;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
      },
    },
  ];
}
