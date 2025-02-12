import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderPageComponent } from 'src/app/core/shared/header-page/header-page.component';
import { MedalsPieChartComponent } from './medals-pie-chart/medals-pie-chart.component';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subscription } from 'rxjs';
import { Indicator } from 'src/app/core/models/Indicator';
import { DataItem } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HeaderPageComponent, MedalsPieChartComponent]
})
export class HomeComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    indicators: Indicator[] = [];
    title: string = "Medals per country";
    data: DataItem[] = [];

    constructor(private olympicService: OlympicService) {}

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
}
