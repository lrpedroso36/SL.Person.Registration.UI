import { Routes } from "@angular/router";
import { PersonListComponent } from "./components/person-list/person-list.component";
import { PersonRegistration } from "./components/person-registration/person-registration";

export const PERSON_ROUTES: Routes = [
  { path: 'list', component: PersonListComponent },
  { path: 'registration/new', component: PersonRegistration },
  { path: 'registration/edit/:id', component: PersonRegistration }
];
