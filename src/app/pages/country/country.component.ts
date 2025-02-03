import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  public countryData$!: Observable<Olympic | undefined>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    // Retrieve the country ID from the route parameters and fetch the corresponding country data
    // * paramMap is an observable that contains a map of the required and optional parameters specific to the route.
    // * switchMap is used to map the value from the source observable to a new observable.
    this.countryData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const idParam = params.get('id');
        if (idParam) {
          const countryId = +idParam;
          return this.olympicService.getOlympicById(countryId);
        }
        return of(undefined);
      })
    );
  }
}
