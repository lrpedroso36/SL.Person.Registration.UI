import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PersonApiService } from './shared';
import { LookupApiService } from './shared';
import { ContactApiService } from './shared';
import { PersonListComponent } from './list';
import { PersonInsertComponent } from './insert';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonInsertComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [ 
    PersonApiService,
    LookupApiService,
    ContactApiService
  ]
})
export class PersonModule { }
