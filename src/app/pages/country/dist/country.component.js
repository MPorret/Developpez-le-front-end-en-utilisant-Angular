"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CountryComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CountryComponent = /** @class */ (function () {
    function CountryComponent(route, olympicService) {
        this.route = route;
        this.olympicService = olympicService;
    }
    CountryComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Retrieve the country ID from the route parameters and fetch the corresponding country data
        // * paramMap is an observable that contains a map of the required and optional parameters specific to the route.
        // * switchMap is used to map the value from the source observable to a new observable.
        this.countryData$ = this.route.paramMap.pipe(operators_1.switchMap(function (params) {
            var idParam = params.get('id');
            if (idParam) {
                var countryId = +idParam;
                return _this.olympicService.getOlympicById(countryId);
            }
            return rxjs_1.of(undefined);
        }));
    };
    CountryComponent = __decorate([
        core_1.Component({
            selector: 'app-country',
            templateUrl: './country.component.html',
            styleUrls: ['./country.component.scss']
        })
    ], CountryComponent);
    return CountryComponent;
}());
exports.CountryComponent = CountryComponent;
