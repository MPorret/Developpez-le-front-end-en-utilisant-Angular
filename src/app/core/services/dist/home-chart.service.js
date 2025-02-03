"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeChartService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var HomeChartService = /** @class */ (function () {
    function HomeChartService(olympicService) {
        this.olympicService = olympicService;
        // Define the properties for the pie chart
        this.pieChartData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    type: 'pie',
                    label: '$',
                    hidden: false,
                    indexAxis: 'y',
                    normalized: true,
                    order: 1,
                    rotation: 0,
                    spacing: 0,
                    transitions: {
                        // Define the transitions for the dataset
                        show: {
                            animation: {
                                duration: 1000,
                                easing: 'easeOutBounce'
                            }
                        },
                        hide: {
                            animation: {
                                duration: 1000,
                                easing: 'easeOutBounce'
                            }
                        }
                    },
                    weight: 1,
                    borderColor: 'none',
                    borderWidth: 0,
                    hoverBorderColor: 'white',
                    hoverBorderWidth: 1,
                    backgroundColor: [
                        this.getCssVariableValue('--italy-color'),
                        this.getCssVariableValue('--spain-color'),
                        this.getCssVariableValue('--united-states-color'),
                        this.getCssVariableValue('--germany-color'),
                        this.getCssVariableValue('--france-color'),
                    ]
                },
            ],
            // xLabels and yLabels are used to display the labels on the x-axis and y-axis respectively
            xLabels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
            yLabels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5']
        };
        this.pieChartLegend = false;
        this.pieChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.pieChartType = 'pie';
        this.pieChartPlugins = [
            {
                beforeDraw: function (chart) {
                    var ctx = chart.ctx;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                }
            },
        ];
    }
    /**
     * Returns an observable of the pie chart labels (countries).
     * @returns {Observable<string[]>} An observable containing the pie chart labels.
     */
    HomeChartService.prototype.getPieChartLabels = function () {
        return this.olympicService.getOlympics().pipe(operators_1.map(function (olympics) { return olympics.map(function (o) { return o.country; }); }), operators_1.catchError(function () { return rxjs_1.of([]); }));
    };
    /**
     * Returns an observable of the pie chart data for a specific country.
     * @param {number} id - The id of the country for which to fetch the pie chart data.
     * @returns {Observable<number[]>} An observable containing the pie chart data.
     */
    HomeChartService.prototype.getPieMedalsByCountry = function () {
        return this.olympicService.getOlympics().pipe(operators_1.map(function (olympics) {
            return olympics.map(function (o) {
                return o.participations.reduce(function (acc, curr) { return acc + curr.medalsCount; }, 0);
            });
        }), operators_1.catchError(function () { return rxjs_1.of([]); }));
    };
    /**
     * Returns the value of a CSS variable.
     * @param {string} variableName - The name of the CSS variable.
     * @returns {string} The value of the CSS variable.
     */
    HomeChartService.prototype.getCssVariableValue = function (variableName) {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName);
    };
    HomeChartService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], HomeChartService);
    return HomeChartService;
}());
exports.HomeChartService = HomeChartService;
