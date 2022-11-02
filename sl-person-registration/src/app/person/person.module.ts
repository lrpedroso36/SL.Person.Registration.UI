import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AssignmentApiService, InterviewApiService, PersonApiService, LookupApiService, AddressApiService, PersonListService } from './shared';

import { PersonListComponent } from './list';
import { PersonInsertComponent } from './insert';
import { PersonEditComponent } from './edit';
import { PersonInterviewListComponent } from './interview/list';
import { PersonInterviewComponent } from './interview/insert';
import { PersonInterviewViewComponent } from './interview/view';
import { PersonLaborerComponent } from './laborer/list';
import { PersonLaborerViewComponent } from './laborer/view';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonInsertComponent,
    PersonEditComponent,
    PersonInterviewListComponent,
    PersonInterviewComponent,
    PersonInterviewViewComponent,
    PersonLaborerComponent,
    PersonLaborerViewComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [ 
    AddressApiService,
    AssignmentApiService,
    InterviewApiService,
    LookupApiService,
    PersonApiService,
    PersonListService
  ]
})
export class PersonModule { }
