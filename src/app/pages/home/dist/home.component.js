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
var ng2_charts_1 = require("ng2-charts");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(olympicService, homeChartService) {
        this.olympicService = olympicService;
        this.homeChartService = homeChartService;
        this.susbcriptions = new rxjs_1.Subscription();
        this.pieChartLegend = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData();
        // Subscribe to observable for retrieving and update chartData
        this.susbcriptions.add(this.homeChartService
            .getPieChartLabels()
            .subscribe(function (labels) {
            _this.homeChartService.pieChartData.labels = labels;
            if (_this.chart) {
                _this.chart.update();
            }
        }));
        this.susbcriptions.add(this.homeChartService
            .getPieMedalsByCountry()
            .subscribe(function (medals) {
            _this.homeChartService.pieChartData.datasets[0].data = medals;
            console.log(medals);
            if (_this.chart) {
                _this.chart.update();
            }
        }));
        this.pieChartData = this.homeChartService.pieChartData;
        this.pieChartOptions = this.homeChartService.pieChartOptions;
        this.pieChartPlugins = this.homeChartService.pieChartPlugins;
        this.pieChartType = this.homeChartService.pieChartType;
    };
    HomeComponent.prototype.fetchData = function () {
        this.olympics$ = this.olympicService.getOlympics();
        this.getNumberOfCountry$ = this.olympicService.getNumberOfCountry();
        this.getNumberOfParticipation$ =
            this.olympicService.getNumberOfParticipation();
        // combineLatest is used to combine multiple observables into a single observable that emits an array of values.
        this.averageParticipations$ = rxjs_1.combineLatest([
            this.getNumberOfParticipation$,
            this.getNumberOfCountry$,
        ]).pipe(rxjs_1.map(function (_a) {
            var participations = _a[0], countries = _a[1];
            return countries > 0 ? participations / countries : 0;
        }));
    };
    HomeComponent.prototype.retry = function () {
        this.fetchData();
        this.susbcriptions.unsubscribe();
    };
    __decorate([
        core_1.ViewChild(ng2_charts_1.BaseChartDirective)
    ], HomeComponent.prototype, "chart");
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
         *! Used | async pipe in the template to subscribe to the observables & display the data without needing to unsubscribe.
         ** https://angular.fr/pipes/async
         */
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
