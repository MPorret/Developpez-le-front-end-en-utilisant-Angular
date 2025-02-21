import { Component, Input } from '@angular/core';
import { Color, DataItem, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medals-pie-chart',
  imports: [NgxChartsModule],
  templateUrl: './medals-pie-chart.component.html',
  styleUrl: './medals-pie-chart.component.scss'
})
export class MedalsPieChartComponent {
  @Input()
  data: DataItem[] = [];
  view: [number, number] = [window.innerWidth < 700 ? window.innerWidth : window.innerWidth / 1.3, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7', '#956065']
  };

  constructor(private router: Router) { }

  onSelect(data: { name: string, value: number, label: string }): void {
    this.router.navigateByUrl('/' + data.name);
  }

  onResize(event: UIEvent): void {
    const window = event.target as Window;
    this.view = [window.innerWidth < 700 ? window.innerWidth : window.innerWidth / 1.3, 400];
  }

}
