import { Component, OnDestroy, OnInit } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Indicator } from 'src/app/core/models/Indicator';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { HeaderPageComponent } from 'src/app/core/shared/header-page/header-page.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HeaderPageComponent, NgxChartsModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<any> = of(null);
  data: {name: string, value: number}[] = [];
  view: [number, number] = [700, 400];
  subscription!: Subscription;
  title: string = "Medals per country";
  indicators: Indicator[] = [];

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
    this.subscription = this.olympicService.getOlympics().subscribe( (value) => {
      if (value) {
        this.indicators.push({label: "Number of JOs", value: value[0].participations.length});
        this.indicators.push({label: "Number of countries", value: value.length});
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

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
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
