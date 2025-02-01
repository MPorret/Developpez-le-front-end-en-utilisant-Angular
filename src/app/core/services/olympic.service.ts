import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

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
  //! Must be instanciated with an empty array !
  private readonly olympics$ = new BehaviorSubject<Olympic[]>([]);
  private readonly error$ = new BehaviorSubject<string | null>(null);

  /**
   * Constructs the OlympicService.
   * @param {HttpClient} http - The HTTP client used for making requests.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches the initial Olympic data and updates the state and error message accordingly.
   * @returns {Observable<Olympic[]>} An observable containing the Olympic data.
   */
  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      // tap is used to perform side effects on the data emitted by the observable & returns an observable identical to the source.
      tap((value) => {
        this.olympics$.next(value);
        this.error$.next(null);
      }),
      catchError((error) => {
        console.error('Error loading Olympic data:', error);

        this.olympics$.next([]);
        this.error$.next('An error occurred while loading the Olympic data.');

        // of is used to create an observable that emits the values provided as arguments.
        return of([]);
      })
    );
  }

  /**
   * Returns an observable of the Olympic data.
   * @returns {Observable<Olympic[]>} An observable containing the Olympic data.
   */
  getOlympics(): Observable<Olympic[]> {
    // asObservable() is used to return an observable of the BehaviorSubject & prevents direct access to the BehaviorSubject.
    return this.olympics$.asObservable();
  }

  /**
   * Returns an observable of the Olympic data for a specific country.
   * @param {string} country - The country for which to fetch the Olympic data.
   */
  getOlympicById(id: number): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics) => olympics.find((o) => o.id === id))
    );
  }

  /**
   * Returns an observable of the number of countries in the Olympic data.
   * @returns {Observable<number>} An observable containing the number of countries.
   */
  getNumberOfCountry(): Observable<number> {
    return this.olympics$.pipe(map((olympics) => olympics.length));
  }

  /**
   * Returns an observable of the number of participations in the Olympic data.
   * @returns {Observable<number>} An observable containing the number of participations.
   */
  getNumberOfParticipation(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics) =>
        olympics.reduce((acc, curr) => {
          acc += curr.participations.length;
          return acc;
        }, 0)
      )
    );
  }

  /**
   * Returns an observable of the error message.
   * @returns {Observable<string | null>} An observable containing the error message.
   */
  getError(): Observable<string | null> {
    return this.error$.asObservable();
  }
}
