import { Routes } from "@angular/router";

import { PersonListComponent } from "./list";
import { PersonInsertComponent } from "./insert";

export const PersonRoutes: Routes = [
    {
        path: 'person-list',
        redirectTo: 'person/list'
    },
    {
        path: 'person/list',
        component: PersonListComponent
    },
    {
        path: 'person/insert',
        component: PersonInsertComponent
    },
]