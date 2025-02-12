import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
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

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe( (value) => {
      if (value) {
        value.forEach((countryData: OlympicCountry) => {
          let medals: number = 0;
          countryData.participations.forEach((participation: Participation) => medals += participation.medalsCount);
          this.data.push({
            name: countryData.country,
            value: medals
          });
        })
      }
    })
  }

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
