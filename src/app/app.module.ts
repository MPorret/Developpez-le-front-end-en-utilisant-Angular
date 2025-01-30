import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// @https://stackoverflow.com/questions/78430636/httpclientmodule-is-deprecated-in-angular-18-whats-the-replacement


// This is a decorator function that takes a metadata object as an argument and applies it to the class it precedes (AppModule)
@NgModule({
  // This is where you declare components, directives and pipes
  declarations: [AppComponent, HomeComponent, NotFoundComponent],

  // This is where you import modules
  //! HttpClientModule is now provided by the provideHttpClient() provider function --- Depecrated since Anuglar 18
  imports: [BrowserModule, AppRoutingModule],

  // This is where you provide services for all the components in the module
  //! Superseded by the already existing provideHttpClient() provider function
  providers: [provideHttpClient()],

  // Told Angular to start with AppComponent
  // Angular shall create this component and insert it into the index.html (DOM)
  bootstrap: [AppComponent],
})

// This is the root module
export class AppModule {}
