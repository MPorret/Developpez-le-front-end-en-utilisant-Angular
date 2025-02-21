import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderPageComponent } from "../../core/shared/header-page/header-page.component";
import { Indicator } from 'src/app/core/models/Indicator';
import { ButtonComponent } from "../../core/shared/button/button.component";
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subscription, tap } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { DataItem, Series } from '@swimlane/ngx-charts';
import { Participation } from 'src/app/core/models/Participation';
import { CountryLineChartComponent } from "./country-line-chart/country-line-chart.component";
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-details',
  imports: [HeaderPageComponent, ButtonComponent, CountryLineChartComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{
  countryName: string = this.route.snapshot.params['country'];
  indicators: Indicator[] = [];
  subscription!: Subscription;
  data: Series[] = [];
  error: number = 0;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private loadingService: LoadingService){}

  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.subscription = this.olympicService.getOlympics().pipe(
      tap((value)=> {
        if (Array.isArray(value)){
          const selectedCountry = value.find((e: OlympicCountry)=> e.country === this.countryName);
          if (selectedCountry) {
            this.formatDataForLineChart(selectedCountry)
            this.loadingService.loadingOff();
          } else {
            this.error = 404;
          }
        } else if (value) {
          this.error = value;
        }
        this.loadingService.loadingOff();
      }),

    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    }

  formatDataForLineChart(selectedCountry: OlympicCountry){
    const {participations, country} = selectedCountry;
    const calculTotal = (data: Participation[], key: 'medalsCount' | 'athleteCount') => {
      let result = 0;
      data.forEach((value: Participation) => {
        result += value[key];
      })
      return result;
    }
    this.indicators.push({label: "Number of entries", value: participations.length});
    this.indicators.push({label: "Total number medals", value: calculTotal(participations, 'medalsCount')});
    this.indicators.push({label: "Total number of athletes", value: calculTotal(participations, 'athleteCount')});

    const series: DataItem[] = [];
    participations.forEach((participation: Participation) => {
      series.push({
        "name": participation.year.toString(),
        "value": participation.medalsCount
      })
    })

    this.data = [{
      "name": country,
      "series": series,
    }];
  }
}
