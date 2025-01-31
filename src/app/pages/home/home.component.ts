import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

/** Home component that displays the Olympic data and statistics.
 * @class HomeComponent
 * @implements {OnInit}
 * 
 * @property {Observable<Olympic[]>} olympics$ - An observable containing the Olympic data.
 * @property {Observable<number>} getNumberOfCountry$ - An observable containing the number of countries.
 * @property {Observable<number>} getNumberOfParticipation$ - An observable containing the number of participations.
 * @property {Observable<number>} averageParticipations$ - An observable containing the average number of participations per country.
 * @property {Observable<string | null>} error$ - An observable containing the error message.
 *! Used | async pipe in the template to subscribe to the observables & display the data without needing to unsubscribe.
 ** https://angular.fr/pipes/async   
*/
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  public getNumberOfCountry$!: Observable<number>;
  public getNumberOfParticipation$!: Observable<number>;
  public averageParticipations$!: Observable<number>;
  public error$!: Observable<string | null>;

  constructor(private readonly olympicService: OlympicService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getNumberOfCountry$ = this.olympicService.getNumberOfCountry();
    this.getNumberOfParticipation$ = this.olympicService.getNumberOfParticipation();

    // combineLatest is used to combine multiple observables into a single observable that emits an array of values.
    this.averageParticipations$ = combineLatest([
      this.getNumberOfParticipation$,
      this.getNumberOfCountry$
    ]).pipe(
      map(([participations, countries]) => (countries > 0 ? participations / countries : 0))
    );

    this.error$ = this.olympicService.getError();
  }

  retry(): void {
    this.fetchData();
  }
}
