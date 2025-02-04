# Telesport

![Angular](https://img.shields.io/badge/-Angular-DD0031?logo=angular&logoColor=white&style=flat)
![RxJS](https://img.shields.io/badge/RxJS-v7.8.0-blue)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white&style=flat)
![SASS](https://img.shields.io/badge/-SASS-CC6699?logo=sass&logoColor=white&style=flat)

![Node.js Version](https://img.shields.io/badge/node.js-v22.11.0-green)
![npm Version](https://img.shields.io/badge/npm-v11.0.0-blue)
![Dernière mise à jour](https://img.shields.io/github/last-commit/Escanor1986/Telesport)


Telesport is an Angular-based web application that provides comprehensive insights into Olympic Games data, including country-specific participations, medal counts, and athlete statistics. The application offers interactive visualizations to enhance user engagement and understanding. It is build using reactive programming and Singleton design pattern.

## Live Demo

Experience the application live at: [https://escanor1986.github.io/Telesport/](https://escanor1986.github.io/Telesport/)

## Features

- **Country Overview**: Displays a list of countries that have participated in the Olympic Games.
- **Detailed Country Statistics**: For each country, view:
  - Total number of participations.
  - Total medals won.
  - Total number of athletes.
  - Year-wise medal count represented through interactive line charts.
- **Interactive Charts**: Utilizes `ng2-charts` and `Chart.js` for dynamic data visualization.

## Technologies Used

- **Angular**: Version 18.0.3
- **Chart Libraries**:
  - `ng2-charts`: Version 7.0.0
  - `Chart.js`: Version 4.3.0
- **Additional Libraries**:
  - `ngx-echarts`: Version 19.0.0
  - `echarts`: Version 5.6.0

## Installation

To set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Escanor1986/Telesport.git
   cd Telesport
   ```

2. **Install Dependencies**:

   Ensure you have Node.js (version 22.11.0) and npm (version 11.0.0) installed. Then, run:

   ```bash
   npm install
   ```

3. **Start the Application**:

   ```bash
   ng serve
   ```

   The application will be accessible at `http://localhost:4200/`.

## Build & deployment

The application is built and deployed using Angular CLI and hosted on GitHub Pages. Deployment is automated through GitHub Actions. To manually deploy:

1. **Build the Application**:

   ```bash
   ng build --base-href "https://escanor1986.github.io/Telesport/"
   ```

2. **Deploy to GitHub Pages**:

   ```bash
   npx angular-cli-ghpages --dir=dist/olympic-games-starter
   ```

## Project Structure

- **`src/app/core/models`**: Contains the `Olympic` model defining the data structure.
- **`src/app/core/services`**: Includes the `OlympicService` for fetching Olympic data.
- **`src/app/components`**:
  - `home`: Displays the list of countries and a pie chart of their participations.
  - `country`: Shows detailed statistics and a line chart for a selected country.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to the developers and contributors of the libraries and frameworks used in this project.
