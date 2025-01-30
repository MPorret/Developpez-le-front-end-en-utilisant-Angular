import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// * JSDoc is a markup language used to annotate JavaScript code. It's used to document the codebase and provide additional information about the code.
//! https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html?utm_source=chatgpt.com

/**
 * Service responsible for fetching and managing Olympic data.
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  /**
   * URL to the Olympic data JSON file.
   * @private
   */
  private readonly olympicUrl = './assets/mock/olympic.json';

  /**
   * BehaviorSubject holding the current state of Olympic data.
   * @private
   */
  private readonly olympics$ = new BehaviorSubject<any>(undefined);

  /**
   * Constructs the OlympicService.
   * @param {HttpClient} http - The HTTP client used for making requests.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Loads the initial Olympic data from the JSON file.
   * On success, updates the olympics$ BehaviorSubject with the fetched data.
   * On error, logs the error and updates olympics$ with a personal error message.
   * @returns {Observable<any>} An observable of the HTTP request.
   */
  loadInitialData(): Observable<any> {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error('Error loading Olympic data:', error);

        const friendlyErrorMessage =
          'An error occurred while loading the Olympic data.';
        this.olympics$.next({ error: friendlyErrorMessage });

        return of({ error: friendlyErrorMessage });
      })
    );
  }

  /**
   * Returns an observable of the Olympic data.
   * @returns {Observable<any>} An observable containing the Olympic data.
   */
  getOlympics(): Observable<any> {
    return this.olympics$.asObservable();
  }
}
