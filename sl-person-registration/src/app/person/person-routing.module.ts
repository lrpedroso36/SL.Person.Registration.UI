import { Routes } from "@angular/router";

import { PersonListComponent } from "./list";
import { PersonInsertComponent } from "./insert";
import { PersonEditComponent } from "./edit";
import { PersonInterviewComponent } from "./interview";

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
        path: 'person/list/:documentNumber',
        component: PersonListComponent
    },
    {
        path: 'person/insert',
        component: PersonInsertComponent
    },
    {
        path: 'person/edit/:documentNumber',
        component: PersonEditComponent
    },
    {
        path: 'person/interview/:documentNumber',
        component: PersonInterviewComponent
    }
]