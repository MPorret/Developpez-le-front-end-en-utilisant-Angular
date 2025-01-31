import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public getNumberOfCountry$: Observable<number> = of(0);
  public getNumberOfParticipation$: Observable<number> = of(0);
  public error$: Observable<string | null> = of(null);

  constructor(private readonly olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getNumberOfCountry$ = this.olympicService.getNumberOfCountry();
    this.getNumberOfParticipation$ = this.olympicService.getNumberOfParticipation();
    // Debugging the data
    this.olympics$.subscribe((data) => {
      console.log(data);
    });
    this.getNumberOfCountry$.subscribe((data) => {
      console.log(data);
    });
    this.getNumberOfParticipation$.subscribe((data) => {    
      console.log(data);
    });
    this.error$ = this.olympicService.getError();

  }
}
