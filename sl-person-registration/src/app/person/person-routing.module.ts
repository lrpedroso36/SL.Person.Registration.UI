import { Routes } from "@angular/router";

import { PersonListComponent } from "./list";
import { PersonInsertComponent } from "./insert";
import { PersonEditComponent } from "./edit";
import { PersonLaborerComponent } from "./laborer/list";
import { PersonLaborerViewComponent } from "./laborer/view";
import { PersonInterviewListComponent } from "./interview/list";
import { PersonInterviewViewComponent } from "./interview/view";
import { PersonInterviewComponent } from "./interview/insert";
import { PersonWorkscheduleListComponent } from "./workschedule/list";
import { PersonWorkscheduleInsertComponent } from "./workschedule/insert";

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
        path: 'person/list/:id',
        component: PersonListComponent
    },
    {
        path: 'person/insert',
        component: PersonInsertComponent
    },
    {
        path: 'person/edit/:id',
        component: PersonEditComponent
    },
    {
        path: 'laborer/list',
        component: PersonLaborerComponent
    },
    {
        path: 'laborer/list/:id',
        component: PersonLaborerComponent
    },
    {
        path: 'laborer/view/:id',
        component: PersonLaborerViewComponent
    },
    {
        path: 'interview/list',
        component: PersonInterviewListComponent
    },
    {
        path: 'interview/list/:id',
        component: PersonInterviewListComponent
    },
    {
        path: 'interview/view/:id',
        component: PersonInterviewViewComponent
    },
    {
        path: 'interview/:id',
        component: PersonInterviewComponent
    },
    {
        path: 'workschedule/list',
        component: PersonWorkscheduleListComponent
    },
    {
        path: 'workschedule/list/:id',
        component: PersonWorkscheduleListComponent
    },
    {
        path: 'workschedule/:id',
        component: PersonWorkscheduleInsertComponent
    }
]