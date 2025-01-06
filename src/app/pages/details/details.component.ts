import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Location } from '@angular/common';
import { Observable,of,Subscription } from 'rxjs';
import { Country } from '../../core/models/Country';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  //------------------------------------------------------------------------------------------------
  // Variables for Country Data. These variables hold the observable and data related to the selected country
  //------------------------------------------------------------------------------------------------

  countrydata: Observable<Country> | null = null;
  countryname: Country| null = null;
  participantdata: Observable<number> | null = null;
  entredata: Observable<number> | null = null;
  medaldata: Observable<number> | null = null;

  //------------------------------------------------------------------------------------------------
  // Store subscriptions to unsubscribe when the component is destroyed
  //------------------------------------------------------------------------------------------------

  private subscriptions: Subscription = new Subscription();

  //------------------------------------------------------------------------------------------------
  // Variables for Line Chart. These variables hold the data and options for the line chart & Chart options
  //------------------------------------------------------------------------------------------------

  lineChartData: any[] = [];
  view: [number, number] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year'; 
  showYAxisLabel = true;
  yAxisLabel = 'Medals';
  colorScheme = {domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']};

  //------------------------------------------------------------------------------------------------
  // The constructor initializes the component with necessary services and route parameters:
  // - route: ActivatedRoute to access route parameters.
  // - olympicService: Service to fetch Olympic-related data.
  // - location: Location service for navigation.
  // - router: Router service for programmatic navigation.
  //------------------------------------------------------------------------------------------------

  constructor(
    private route: ActivatedRoute,
    public olympicService: OlympicService,
    private location: Location,
    private router: Router 
  ) {}


  //------------------------------------------------------------------------------------------------
  // This method is called once the component is initialized. It retrieves the country ID from
  // the route, fetches country data, and subscribes to observables to get various statistics.
  //------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    
    this.updateChartDimensions(window.innerWidth);            // Update chart dimensions based on window width
    const idString = this.route.snapshot.paramMap.get('id');  // Get country ID from route
    const id = idString ? Number(idString) : undefined;       // Convert string to number
    
    if (id !== undefined && id <= 6) { // Check if id is valid and in range
      
      this.countrydata = this.olympicService.getCountrybyidv2(id);
      this.participantdata = this.olympicService.getNumberOfAthletesv2(this.countrydata);
      this.medaldata = this.olympicService.getCountryMedalsv2(this.countrydata);
      this.entredata = this.olympicService.getNumberOfEntriesv2(this.countrydata);
      
      //console.log("test",this.participantdata)  display test
      
      // Subscribe to country data observable
      this.subscriptions.add(
      this.countrydata.subscribe({
        next: (country) => {
          //console.log('Country Data:', country); // Log the entire country data
          if (country) {
            this.countryname = country;  // Store the country data
            this.updateChartData();}      // Update chart data based on country participations
          else 
          { 
            console.warn('Country data is null');
            this.router.navigate(['/not-found']); // Navigate to not-found page if data is null
          }
        },
        error: (err) => {
          console.error('Error loading country data:', err);
          this.router.navigate(['/not-found']);// Navigate to not-found page if data is null
        }
      }));
    } else {
      this.router.navigate(['/not-found']);// Navigate to not-found page if data is null
    }   
  }

  //------------------------------------------------------------------------------------------------
  // Update Chart Data based on the participations of the selected country.
  // It maps the participations to a format suitable for the chart and logs the data for debugging.
  //------------------------------------------------------------------------------------------------

  updateChartData(): void {
    if (this.countryname && this.countryname.participations) {
      this.lineChartData = [
        {
          name: this.countryname.country,
          series: this.countryname.participations.map((p: any) => ({
            name: p.year.toString(),
            value: p.medalsCount 
          }))
        }
      ];
      console.log('Line Chart Data:', this.lineChartData); // Log chart data for debugging
    } else {
      this.lineChartData = []; // Reset chart data if no valid participations found
      console.log('No valid participations found for country'); // Log if no data
    }
  }

  //------------------------------------------------------------------------------------------------
  // Go Back Method to navigate back to the previous page
  //------------------------------------------------------------------------------------------------

  goBack(): void {
    this.location.back(); // Use Location service to go back
  }

  //------------------------------------------------------------------------------------------------
  // Update Chart Dimensions when the window is resized.
  //------------------------------------------------------------------------------------------------

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartDimensions(event.target.innerWidth); // Update chart dimensions based on window width
  }

  //------------------------------------------------------------------------------------------------
  // Update Chart Dimensions based on window width
  //------------------------------------------------------------------------------------------------

  updateChartDimensions(width: number) {
    this.view = this.olympicService.getChartDimensions(width); // Get chart dimensions from the service
  }

  //------------------------------------------------------------------------------------------------
  // Unsubscribe from all subscriptions when the component is destroyed
  //------------------------------------------------------------------------------------------------

  ngOnDestroy(): void { // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }
}
