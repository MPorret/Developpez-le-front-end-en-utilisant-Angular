import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  public countryId!: number;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieved Id from URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.countryId = +idParam;
        // Ici vous pouvez appeler un service pour récupérer et traiter les données du pays concerné
      }
    });
  }
}
