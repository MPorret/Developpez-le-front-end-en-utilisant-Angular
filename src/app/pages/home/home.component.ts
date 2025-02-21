import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderPageComponent } from 'src/app/core/shared/header-page/header-page.component';
import { MedalsPieChartComponent } from './medals-pie-chart/medals-pie-chart.component';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subscription, tap } from 'rxjs';
import { Indicator } from 'src/app/core/models/Indicator';
import { DataItem } from '@swimlane/ngx-charts';
import { ErrorComponent } from "../../core/shared/error/error.component";
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [HeaderPageComponent, MedalsPieChartComponent, ErrorComponent]
})
export class HomeComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    indicators: Indicator[] = [];
    title: string = "Medals per country";
    data: DataItem[] = [];
    error: number = 0;
    button: boolean = false;

    constructor(private olympicService: OlympicService, private loadingService: LoadingService) {}

    ngOnInit(): void {
        this.loadingService.loadingOn();
        this.subscription = this.olympicService.getOlympics().pipe(
            tap((value) => {
                if (Array.isArray(value)) {
                    this.formatDataForPieChart(value);
                    this.loadingService.loadingOff();
                } else if (value) {
                    this.error = value;
                }
            })
        ).subscribe()
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    formatDataForPieChart(value: OlympicCountry[]){
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
}
