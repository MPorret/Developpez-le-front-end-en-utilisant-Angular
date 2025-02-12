import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HeaderPageComponent } from "./core/shared/header-page/header-page.component";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule,HomeComponent, AppRoutingModule, HttpClientModule, NgxChartsModule, HeaderPageComponent],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
