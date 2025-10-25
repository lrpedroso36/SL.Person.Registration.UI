import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PersonListComponent } from '../person/components/person-list/person-list.component';
import { HomeInitialComponent } from '../home/components/home-initial/home-initial.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeInitialComponent },
      { path: '', redirectTo: 'person/list', pathMatch: 'full' },
      { path: 'person/list', component: PersonListComponent },
    ],
  },
];
