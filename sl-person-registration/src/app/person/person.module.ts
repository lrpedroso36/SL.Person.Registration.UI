import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AssignmentApi, InterviewApi, PersonApi, LookupApi, PersonService, AddressApi } from './shared';

import { PersonListComponent } from './list';
import { PersonInsertComponent } from './insert';
import { PersonEditComponent } from './edit';
import { PersonInterviewListComponent } from './interview/list';
import { PersonInterviewComponent } from './interview/insert';
import { PersonInterviewViewComponent } from './interview/view';
import { PersonLaborerComponent } from './laborer/list';
import { PersonLaborerViewComponent } from './laborer/view';
import { PersonWorkscheduleListComponent } from './workschedule/list';
import { PersonWorkscheduleInsertComponent } from './workschedule/insert';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonInsertComponent,
    PersonEditComponent,
    PersonInterviewListComponent,
    PersonInterviewComponent,
    PersonInterviewViewComponent,
    PersonLaborerComponent,
    PersonLaborerViewComponent,
    PersonWorkscheduleListComponent,
    PersonWorkscheduleInsertComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [ 
    AddressApi,
    AssignmentApi,
    InterviewApi,
    LookupApi,
    PersonApi,
    PersonService
  ]
})
export class PersonModule { }
