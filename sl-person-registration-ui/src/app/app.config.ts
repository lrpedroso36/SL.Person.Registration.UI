import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const MyBluePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6eef9',
      100: '#c2d3ef',
      200: '#99b7e4',
      300: '#709bda',
      400: '#4a7fd0',
      500: '#2c66b5',
      600: '#1d4f91',
      700: '#133b73',
      800: '#0a2c5e',
      900: '#051c3b',
      950: '#021229',
    },
    surface: {
      0: '#ffffff',
      50: '#f9fafc',
      100: '#f1f3f7',
      200: '#e1e5ed',
      300: '#cdd3de',
      400: '#aab2c5',
      500: '#868fa8',
      600: '#646c86',
      700: '#4d536b',
      800: '#363a4f',
      900: '#202136',
      950: '#111222',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyBluePreset,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
  ],
};
