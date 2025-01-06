import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  country: any;
  lineChart: any;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    const navigation = window.history.state;
    this.country = navigation.country;
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}