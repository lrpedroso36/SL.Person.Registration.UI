import { Routes } from '@angular/router';
import { LAYOUT_ROUTES } from './layout/layout.routes';

export const routes: Routes = [
  ...LAYOUT_ROUTES,
  { path: '**', redirectTo: '' },
];
