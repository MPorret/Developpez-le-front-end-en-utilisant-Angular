import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of,forkJoin, Subscription} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from '../../core/models/Country';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  //------------------------------------------------------------------------------------------------
  // Variables for Country Data.
  // These variables hold the observable data related to the Olympics and statistics:
  //------------------------------------------------------------------------------------------------

  olympicsdata: Observable<Country[]> = of([]);         // Initialize with an empty observable
  public chartData: any[] = [];                         // Array to hold chart data
  private countryIdMap: { [key: string]: number } = {}; // Map to store country IDs
  numberOfCountries: Observable<number> | null = null; // Observable for number of countries
  numberOfJOs: Observable<number> | null = null;       // Observable for number of participations
  totalMedals: Observable<number> | null = null;       // Observable for total number of medals 

  //------------------------------------------------------------------------------------------------
  // Store subscriptions to unsubscribe when the component is destroyed
  //------------------------------------------------------------------------------------------------
  private subscriptions: Subscription = new Subscription();

  //------------------------------------------------------------------------------------------------
  // Variables for Graph Chart. These variables hold configuration options for the chart visualization
  //------------------------------------------------------------------------------------------------

  view: [number, number] = [700, 400];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = {domain: [
      '#8B6F7C', // Italy
      '#6B4C5E', // Germany
      '#A7BBE6', // United States
      '#8E7B9D', // France
      '#B8D0E6', // UK
      '#C4D7E6', // Spain
  ]};


  //------------------------------------------------------------------------------------------------
  // The constructor initializes the component with necessary services and route parameters:
  // - olympicService: Service to fetch Olympic-related data.
  // - router: Router service for programmatic navigation.
  //------------------------------------------------------------------------------------------------

  constructor(
    public olympicService: OlympicService,
    private router: Router
    ) {}

  //------------------------------------------------------------------------------------------------
  // This method is called once the component is initialized. It retrieves Olympic data,
  // calculates statistics, and prepares data for chart visualization.
  //------------------------------------------------------------------------------------------------

    ngOnInit(): void {

      this.updateChartDimensions(window.innerWidth);         // Update chart dimensions based on window width
      this.olympicsdata = this.olympicService.getOlympics(); // Fetch Olympic data

      this.olympicService.getNumberOfCountriesv2(this.olympicsdata).subscribe(count => {
      this.numberOfCountries = of(count);}); // Store the number of countries

      this.olympicService.getNumberOfJOsv2(this.olympicsdata).subscribe(maxId => {
      this.numberOfJOs = of(maxId);});       // Store the number of participations

      this.olympicService.getTotalMedalsv2(this.olympicsdata).subscribe(totalMedals => {
      this.totalMedals = of(totalMedals);}); // Store the total number of medals

      // Subscribe to the olympicsdata observable to process country data
      this.olympicsdata.subscribe(data => {
        if (data) {
          const countryObservables = data.map((country: Country) => {
            this.countryIdMap[country.country] = country.id;
 
            return this.olympicService.getCountryMedalsv2(of(country)).pipe(
              map(medals => ({
                name: country.country,
                value: medals // Use the medals count from the observable
              }))
            );
          });
  
          // Subscribe and Use forkJoin to wait for all observables to complete and update chart data
          this.subscriptions.add(
          forkJoin(countryObservables).subscribe(results => { // Use forkJoin to wait for all observables to complete
            this.chartData = results as any[]; // Type assertion to fix type error
          }));
        }
      });
    
    }

    //------------------------------------------------------------------------------------------------
    // Unsubscribe from all subscriptions when the component is destroyed
    //------------------------------------------------------------------------------------------------

    ngOnDestroy(): void { // Unsubscribe from all subscriptions
      this.subscriptions.unsubscribe();
    }

    //------------------------------------------------------------------------------------------------
    // This method is called when a chart element is selected. It retrieves the country ID
    // based on the selected country name and navigates to the corresponding country details page.
    //------------------------------------------------------------------------------------------------

    onSelect(event: any): void {
      console.log('Graph clicked:', event); // Log the click event
      const countryName = event.name;       // Use name to find the ID
      const countryId = this.countryIdMap[countryName]; // Retrieve ID from the map
      if (countryId) {
        this.router.navigate(['/country', countryId]); // Navigate to the country details page
      } else {
        console.error('Country ID not found for name:', countryName); // Log error if ID not found
      }
    }
  
    //------------------------------------------------------------------------------------------------
    // Update Chart Dimensions when the window is resized.
    //------------------------------------------------------------------------------------------------

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.updateChartDimensions(event.target.innerWidth); // Update chart dimensions based on new width
    }
    
    //------------------------------------------------------------------------------------------------
    // Update Chart Dimensions based on window width
    //------------------------------------------------------------------------------------------------

    updateChartDimensions(width: number) {
       this.view = this.olympicService.getChartDimensions(width); // Get chart dimensions from the service
     }
     
  }
  