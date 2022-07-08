import { Routes } from "@angular/router";

import { PersonListComponent } from "./list";
import { PersonInsertComponent } from "./insert";
import { PersonEditComponent } from "./edit";
import { PersonInterviewComponent } from "./interview";
import { PersonLaborerComponent } from "./laborer-list";
import { PersonInterviewListComponent } from "./interview-list";
import { PersonInterviewViewComponent } from "./interview-view";
import { PersonLaborerViewComponent } from "./laborer-view";

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
        path: 'laborer/list',
        component: PersonLaborerComponent
    },
    {
        path: 'laborer/list/:documentNumber',
        component: PersonLaborerComponent
    },
    {
        path: 'laborer/view/:documentNumber',
        component: PersonLaborerViewComponent
    },
    {
        path: 'interview/list',
        component: PersonInterviewListComponent
    },
    {
        path: 'interview/list/:documentNumber',
        component: PersonInterviewListComponent
    },
    {
        path: 'interview/view/:documentNumber',
        component: PersonInterviewViewComponent
    },
    {
        path: 'interview/:documentNumber',
        component: PersonInterviewComponent
    },
]