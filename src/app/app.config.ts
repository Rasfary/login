import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/Aura';
import { serverRoutes } from './app.routes.server';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
     provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ]
};
