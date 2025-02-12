import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Indicator } from 'src/app/core/models/Indicator';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgSelectOption } from '@angular/forms';

@Component({
  selector: 'app-medals-pie-chart',
  imports: [NgxChartsModule],
  templateUrl: './medals-pie-chart.component.html',
  styleUrl: './medals-pie-chart.component.scss'
})
export class MedalsPieChartComponent {
  @Input()
  data: {name: string, value: number}[] = [];
  view: [number, number] = [700, 400];

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

  

  onSelect(data: {name: string, value: number, label: string}): void {
    console.log(data.name, 'is clicked')
  }

  onResize(event: UIEvent): void {
    const window = event.target as Window;
    if (window.innerWidth < 700 ){
      this.view = [window.innerWidth / 1.35, 400];
    }
  }

}
