"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OlympicService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// * JSDoc is a markup language used to annotate JavaScript code. It's used to document the codebase and provide additional information about the code.
//! https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html?utm_source=chatgpt.com
/**
 * Service responsible for fetching and managing Olympic data.
 */
var OlympicService = /** @class */ (function () {
    /**
     * Constructs the OlympicService.
     * @param {HttpClient} http - The HTTP client used for making requests.
     */
    function OlympicService(http) {
        this.http = http;
        /**
         * URL to the Olympic data JSON file.
         * @private
         */
        this.olympicUrl = './assets/mock/olympic.json';
        /**
         * BehaviorSubject holding the current state of Olympic data.
         * @private
         */
        //! Must be instanciated with an empty array !
        this.olympics$ = new rxjs_1.BehaviorSubject([]);
        this.error$ = new rxjs_1.BehaviorSubject(null);
    }
    /**
     * Fetches the initial Olympic data and updates the state and error message accordingly.
     * @returns {Observable<Olympic[]>} An observable containing the Olympic data.
     */
    OlympicService.prototype.loadInitialData = function () {
        var _this = this;
        return this.http.get(this.olympicUrl).pipe(
        // tap is used to perform side effects on the data emitted by the observable & returns an observable identical to the source.
        operators_1.tap(function (value) {
            _this.olympics$.next(value);
            _this.error$.next(null);
        }), operators_1.catchError(function (error) {
            console.error('Error loading Olympic data:', error);
            _this.olympics$.next([]);
            _this.error$.next('An error occurred while loading the Olympic data.');
            // of is used to create an observable that emits the values provided as arguments.
            return rxjs_1.of([]);
        }));
    };
    /**
     * Returns an observable of the Olympic data.
     * @returns {Observable<Olympic[]>} An observable containing the Olympic data.
     */
    OlympicService.prototype.getOlympics = function () {
        // asObservable() is used to return an observable of the BehaviorSubject & prevents direct access to the BehaviorSubject.
        return this.olympics$.asObservable();
    };
    /**
     * Returns an observable of the Olympic data for a specific country.
     * @param {string} country - The country for which to fetch the Olympic data.
     */
    OlympicService.prototype.getOlympic = function (id) {
        return this.olympics$.pipe(operators_1.map(function (olympics) { return olympics.find(function (o) { return o.id === id; }); }));
    };
    /**
     * Returns an observable of the error message.
     * @returns {Observable<string | null>} An observable containing the error message.
     */
    OlympicService.prototype.getError = function () {
        return this.error$.asObservable();
    };
    OlympicService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OlympicService);
    return OlympicService;
}());
exports.OlympicService = OlympicService;
