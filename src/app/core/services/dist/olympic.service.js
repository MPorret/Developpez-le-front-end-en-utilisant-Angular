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
        this.olympics$ = new rxjs_1.BehaviorSubject(undefined);
    }
    /**
     * Loads the initial Olympic data from the JSON file.
     * On success, updates the olympics$ BehaviorSubject with the fetched data.
     * On error, logs the error and updates olympics$ with a personal error message.
     * @returns {Observable<any>} An observable of the HTTP request.
     */
    OlympicService.prototype.loadInitialData = function () {
        var _this = this;
        return this.http.get(this.olympicUrl).pipe(operators_1.tap(function (value) { return _this.olympics$.next(value); }), operators_1.catchError(function (error) {
            console.error('Error loading Olympic data:', error);
            var friendlyErrorMessage = 'An error occurred while loading the Olympic data.';
            _this.olympics$.next({ error: friendlyErrorMessage });
            return rxjs_1.of({ error: friendlyErrorMessage });
        }));
    };
    /**
     * Returns an observable of the Olympic data.
     * @returns {Observable<any>} An observable containing the Olympic data.
     */
    OlympicService.prototype.getOlympics = function () {
        return this.olympics$.asObservable();
    };
    OlympicService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OlympicService);
    return OlympicService;
}());
exports.OlympicService = OlympicService;
