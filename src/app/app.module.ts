import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgxChartsModule,colorSets } from '@swimlane/ngx-charts';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { OlympicService } from './core/services/olympic.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailsComponent],
  imports: [BrowserModule,BrowserAnimationsModule, AppRoutingModule, HttpClientModule, NgxChartsModule],
  providers: [OlympicService],
  bootstrap: [AppComponent],
})
export class AppModule {}
