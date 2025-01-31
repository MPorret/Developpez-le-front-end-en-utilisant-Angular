import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private olympicService: OlympicService) {}
  // Subject is a special type of Observable in RxJS. It allows values to be multicasted to many Observers.
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.olympicService
      .loadInitialData()
      .pipe(
        // takeUntil() is used to complete the observable when the provided observable(destroy$) emits a value. Actually waiting for the destroy$ observable to emit a value and then completing the source observable.
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    // Used to inform all subscribers that the observable is completed.
    this.destroy$.next();
    // Used to release all resources used by the observable.
    this.destroy$.complete();
  }
}
