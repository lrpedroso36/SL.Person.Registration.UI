import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PersonListComponent } from '../person/components/person-list/person-list.component';
import { HomeInitialComponent } from '../home/components/home-initial/home-initial.component';
import { PERSON_ROUTES } from '../person/person.routes';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'person/list', pathMatch: 'full' },
      { path: 'home', component: HomeInitialComponent },
      { path: 'person', children: PERSON_ROUTES },
    ],
  },
];
