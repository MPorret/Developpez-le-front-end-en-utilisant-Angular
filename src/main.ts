import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Load the root module (AppModule) and bootstrap it from app/app.module.ts
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    console.log('Application démarrée avec succès.');
  })
  .catch((err) => {
    // Log the error for debugging purposes
    console.error("Erreur lors du démarrage de l'application :", err);

    // Display a user-friendly error message
    const userMessage = document.createElement('div');
    userMessage.style.position = 'fixed';
    userMessage.style.top = '0';
    userMessage.style.width = '100%';
    userMessage.style.backgroundColor = '#f8d7da';
    userMessage.style.color = '#721c24';
    userMessage.style.padding = '10px';
    userMessage.style.textAlign = 'center';
    userMessage.innerText =
      "Une erreur est survenue lors du démarrage de l'application. Veuillez réessayer plus tard.";
    document.body.appendChild(userMessage);
  });
