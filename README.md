# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

In addition, you need to install ngx-charts to display the charts using the command : `npm install @swimlane/ngx-charts`

Be sure to match each version based on the Package.json file.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!

## What i did

I have separated my project into 3 parts:

- Home: Displays global information about the countries that participated in the Olympics.
- Details: Displays data for a specific country.
- NotFound: Displays a 404 error page.

In `olympic.service.ts`, I created functions that allow retrieving data from the database and displaying it in the home and details components. I implemented the following functions:

- getCountrybyidv2: Find the country by its ID.
- getNumberOfCountriesv2: Retrieves the number of countries that participated in the Olympics.
- getNumberOfJOsv2: Retrieves the number of Olympic Games that took place.
- getTotalMedalsv2: Retrieves the total number of medals won by the countries.
- getCountryMedalsv2: Retrieves the number of medals won by a specific country.
- getNumberOfEntriesv2: Retrieves the number of participations of a country.
- getNumberOfAthletesv2: Retrieves the number of athletes from a country.
- getChartDimensions: It's to manage the responsiveness of my charts.

To create and configure my observables. I created my classes in the `country.ts` and `participation.ts` files, following the data model.

In `app.component.scss` i implemented re-usable styles for my components and responsive styles for my charts.

now following the specifications, i implemented the requested features. Everything can be found in the pages folder.

In my home i implemented 3 box that display the number of JOs, the number of country participant and the total number of medals. 

A pie chart that display each country. when you pass the mouse over a country, a tooltip display the number of medals won by this country. And when you click on a country, you are redirected to the details page of this country.

In my details i implemented 4 box that display the name of the country, the number of entries, the number of athletes, the number of medals.

I also implemented a line chart that display the number of medals won by a country over the years. and a back button to go back to the home page.

In my not found i implemented a 404 error page. that just display a message and a button to go back to the home page.








