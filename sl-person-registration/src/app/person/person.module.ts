import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PersonService } from './shared';
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
    PersonService
  ]
})
export class PersonModule { }
