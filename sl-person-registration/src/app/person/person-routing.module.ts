import { Routes } from "@angular/router";

import { PersonListComponent } from "./list";
import { PersonInsertComponent } from "./insert";
import { PersonEditComponent } from "./edit";
import { PersonInterviewComponent } from "./interview";
import { PersonLaborerComponent } from "./laborer-list";
import { PersonInterviewListComponent } from "./interview-list";

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
    },
    {
        path: 'person/laborer-list',
        component: PersonLaborerComponent
    },
    {
        path: 'person/interview-list',
        component: PersonInterviewListComponent
    }
]