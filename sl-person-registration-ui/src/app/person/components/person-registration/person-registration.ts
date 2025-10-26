import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PersonRegistrationService } from './services/person-registration.service';
import { StepperModule } from 'primeng/stepper';
import { PersonRegistrationBasic } from "../person-registration-basic/person-registration-basic";
import { PersonRegistrationGeneral } from "../person-registration-general/person-registration-general";
import { PersonRegistrationAddress } from "../person-registration-address/person-registration-address";

@Component({
  selector: 'app-person-registration',
  templateUrl: './person-registration.html',
  styleUrl: './person-registration.scss',
  standalone: true,
  imports: [ButtonModule, RouterLink, StepperModule, PersonRegistrationBasic, PersonRegistrationGeneral, PersonRegistrationAddress],
  providers: [
    PersonRegistrationService
  ]
})
export class PersonRegistration implements OnInit {
  private _activetedRoute = inject(ActivatedRoute);
  private _service = inject(PersonRegistrationService);

  title = this._service.title;
  step = signal<number>(1);

  ngOnInit(): void {
    this._service.getTitle(this._activetedRoute.snapshot.paramMap.get('id'));
  }

  onSave(): void {

  }

  onSaveNext(): void {
    this.next();
  }

  onBack(): void {
    this.back();
  }

  private next(): void {
    if (this.step() < 3) this.step.update(v => v + 1);
  }

  private back(): void {
    if (this.step() > 1) this.step.update(v => v - 1);
  }
}
