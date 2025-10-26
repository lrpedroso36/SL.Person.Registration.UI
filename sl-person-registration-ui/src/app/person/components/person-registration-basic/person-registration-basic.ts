import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { PersonRegistration } from '../../models/person-registration.model';

@Component({
  selector: 'app-person-registration-basic',
  templateUrl: './person-registration-basic.html',
  styleUrl: './person-registration-basic.scss',
  standalone: true,
  imports: [InputTextModule,FloatLabelModule, IconFieldModule,InputIconModule,MultiSelectModule,CommonModule, FormsModule],
})
export class PersonRegistrationBasic {
    person: PersonRegistration = {};

    typeOptions = [
    { label: 'Tarefeiro', value: 'Tarefeito' },
    { label: 'Assistido', value: 'Assistido' },
    { label: 'Palestrante', value: 'Palestrante' },
    { label: 'Entrevistador', value: 'Entrevistador' },
  ];
}
