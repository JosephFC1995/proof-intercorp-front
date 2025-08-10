import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import Lara from '@primeuix/themes/lara';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { primeConfig } from './core/config/translate';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'
import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { MessageService } from 'primeng/api';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideTanStackQuery(new QueryClient()),
    provideAnimationsAsync(),
    MessageService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-PE' },
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: '.int-corp-dark',
        }
      },
      translation: {
        ...primeConfig
      },

    }),
    importProvidersFrom(ButtonModule)
  ],
};
