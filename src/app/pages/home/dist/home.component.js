"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(olympicService) {
        this.olympicService = olympicService;
        // Define the properties for the pie chart
        this.pieChartData = {
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
            datasets: [
                {
                    data: [30, 50, 20, 60, 75],
                    borderColor: 'black',
                    borderWidth: 1,
                    hoverBorderColor: 'black',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(153, 102, 255, 0.4)',
                    ]
                },
            ]
        };
        this.pieChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.pieChartType = 'pie';
        this.pieChartLegend = true;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.fetchData();
    };
    HomeComponent.prototype.fetchData = function () {
        try {
            this.olympics$ = this.olympicService.getOlympics();
            this.getNumberOfCountry$ = this.olympicService.getNumberOfCountry();
            this.getNumberOfParticipation$ =
                this.olympicService.getNumberOfParticipation();
            // this.pieChartLabels$ = this.olympicService.getPieChartLabels();
            // combineLatest is used to combine multiple observables into a single observable that emits an array of values.
            this.averageParticipations$ = rxjs_1.combineLatest([
                this.getNumberOfParticipation$,
                this.getNumberOfCountry$,
            ]).pipe(rxjs_1.map(function (_a) {
                var participations = _a[0], countries = _a[1];
                return countries > 0 ? participations / countries : 0;
            }));
        }
        catch (error) {
            this.error$ = this.olympicService.getError();
        }
    };
    HomeComponent.prototype.retry = function () {
        this.fetchData();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
        /** Home component that displays the Olympic data and statistics.
         * @class HomeComponent
         * @implements {OnInit}
         *
         * @property {Observable<Olympic[]>} olympics$ - An observable containing the Olympic data.
         * @property {Observable<number>} getNumberOfCountry$ - An observable containing the number of countries.
         * @property {Observable<number>} getNumberOfParticipation$ - An observable containing the number of participations.
         * @property {Observable<number>} averageParticipations$ - An observable containing the average number of participations per country.
         * @property {Observable<string | null>} error$ - An observable containing the error message.
         * @property {Observable<string[]>} pieChartLabels$ - An observable containing the pie chart labels.
         * @property {Observable<number[]>} pieChartData$ - An observable containing the pie chart data.
         *! Used | async pipe in the template to subscribe to the observables & display the data without needing to unsubscribe.
         ** https://angular.fr/pipes/async
         */
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
