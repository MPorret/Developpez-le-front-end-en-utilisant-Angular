import { Component, Input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType, Series } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-country-line-chart',
  imports: [NgxChartsModule],
  templateUrl: './country-line-chart.component.html',
  styleUrl: './country-line-chart.component.scss'
})
export class CountryLineChartComponent {
  @Input()
  data: Series[] = [];
  view: [number, number] = [window.innerWidth < 900 ? window.innerWidth / 1.3 : 700, 300];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Medals';
  timeline: boolean = false;
  yScaleMax: any = 135;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7', '#956065']
  };

  onResize(event: Event): void {
    const window = event.target as Window;
    if (window.innerWidth < 900) {
      this.view = [window.innerWidth / 1.3, 300];
    }
  }

}
