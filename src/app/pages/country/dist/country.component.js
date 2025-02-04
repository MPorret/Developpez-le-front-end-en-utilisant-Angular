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
        // Agrégats calculés à partir des données
        this.totalParticipations = 0;
        this.totalMedals = 0;
        this.totalAthletes = 0;
        this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        };
        this.lineChartType = 'line';
    }
    CountryComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Récupération de l'ID du pays depuis l'URL et appel du service pour obtenir ses données
        this.countryData$ = this.route.paramMap.pipe(operators_1.switchMap(function (params) {
            var idParam = params.get('id');
            if (idParam) {
                var countryId = +idParam;
                return _this.olympicService.getOlympicById(countryId);
            }
            return rxjs_1.of(undefined);
        }));
        // Souscription à countryData$ pour calculer les agrégats et préparer le graphique
        this.countryData$.subscribe(function (country) {
            if (country) {
                // Calcul du nombre de participations
                _this.totalParticipations = country.participations.length;
                // Calcul du total des médailles sur toutes les participations
                _this.totalMedals = country.participations.reduce(function (sum, participation) { return sum + participation.medalsCount; }, 0);
                // Calcul du total des athlètes sur toutes les participations
                _this.totalAthletes = country.participations.reduce(function (sum, participation) { return sum + participation.athleteCount; }, 0);
                // Préparation des données pour le graphique :
                // - Axe des x : années de participation
                // - Axe des y : nombre de médailles pour chaque participation
                var years = country.participations.map(function (participation) { return participation.year; });
                var medals = country.participations.map(function (participation) { return participation.medalsCount; });
                _this.lineChartData = {
                    labels: years,
                    datasets: [
                        {
                            label: 'Médailles par participation',
                            data: medals,
                            fill: false,
                            borderColor: 'blue',
                            backgroundColor: 'lightblue',
                            tension: 0,
                            type: 'line',
                            normalized: true,
                            segment: {
                                borderColor: 'red',
                                // borderDash: [5, 5],
                                borderWidth: 2,
                                borderJoinStyle: 'round',
                                borderCapStyle: 'butt',
                                backgroundColor: 'rgba(255, 0, 0, 0.1)'
                            },
                            transitions: {
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
                            }
                        },
                    ]
                };
            }
        });
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
