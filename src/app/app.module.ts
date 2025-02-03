import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoaderComponent } from './core/loader/loader/loader.component';

// Import the NgxEchartsModule and echarts module
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, GridComponent, CanvasRenderer]);

// Import the provideCharts and withDefaultRegisterables functions from ng2-charts
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CountryComponent } from './pages/country/country.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomeComponent, CountryComponent, NotFoundComponent, LoaderComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, NgxEchartsModule.forRoot({ echarts }), BaseChartDirective],
  providers: [provideHttpClient(), provideCharts(withDefaultRegisterables())],

  bootstrap: [AppComponent],
})

export class AppModule {}
