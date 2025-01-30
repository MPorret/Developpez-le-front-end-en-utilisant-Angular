import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  // "app-root" is the selector for this component
  // This means that Angular will look for this selector in the index.html
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private olympicService: OlympicService) {}
  public subscription: any;

  ngOnInit(): void {
   this.subscription = this.olympicService.loadInitialData().pipe(
    // take is used to take the first n values emitted by the source observable and unsubscribe automatically after that.
    take(1)).subscribe();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscription.unsubscribe();
  }
}
