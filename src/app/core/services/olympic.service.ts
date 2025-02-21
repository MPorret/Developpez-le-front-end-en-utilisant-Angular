import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => {
        setTimeout(() => this.olympics$.next(value), 1000)
      }),
      catchError(error => {
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(error.status);
        return throwError(() => new Error('Oops! Something went wrong. Please try again later.'));
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
