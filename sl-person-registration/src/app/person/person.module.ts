import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PersonApiService } from './shared';
import { LookupApiService } from './shared';
import { AddressApiService } from './shared';

import { PersonListComponent } from './list';
import { PersonInsertComponent } from './insert';
import { PersonEditComponent } from './edit';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonInsertComponent,
    PersonEditComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [ 
    PersonApiService,
    LookupApiService,
    AddressApiService
  ]
})
export class PersonModule { }
