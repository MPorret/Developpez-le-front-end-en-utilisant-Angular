import { Component, OnInit } from '@angular/core';
import { Observable, of, reduce } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  data: any = [];

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
            country: countryData.country,
            medals: medals
          });
        })
      }
    });
  }
}
