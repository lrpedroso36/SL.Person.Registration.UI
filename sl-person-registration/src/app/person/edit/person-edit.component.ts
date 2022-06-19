import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $ : any;

import { AddressApiService, AddressResult, Lookup, LookupApiService, Person, PersonApiService, PersonResult } from '../shared';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  @ViewChild('formPerson', { static: true }) formPerson: NgForm;

  person = {} as Person;
  lookups: Lookup[] = [];

  personType: string[] = [];
  errors: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personApiService: PersonApiService,
              private lookupApiService: LookupApiService,
              private addressApiService: AddressApiService) { }

  ngOnInit(): void {
    let documentNumber = + this.route.snapshot.params['documentNumber'];
    this.getPerson(documentNumber);
    this.getPersonType();
  }

  private getPerson(documentNumber: number) {
      this.personApiService.getPerson(documentNumber).subscribe((personResult: PersonResult) => {
        var person = personResult.data;
        this.person = new Person(person.types, person.name, person.documentNumber, person.gender, person.birthDate, person.zipCode,
          person.street, person.number, person.neighborhood, person.complement, person.city, person.state, person.ddd, person.phoneNumber);
      }, (errors) => { this.router.navigate(["/person/list"]); });
  }

  clearErros(): void{
    this.errors = [];
  }

  getPersonType(){
    this.lookupApiService.getPersonType().subscribe((lookups: Lookup[]) => {
      this.personType = this.person.types;
      this.checktPersonTypes(lookups);
    })
  }

  setGender(event: any) :void{
    this.person.setGender(event.target.value);
  } 

  setPersonType(lookup: Lookup): void {
     this.person.setType(lookup.name);
     this.personType = this.person.types;
  }

  setBirthDate(event: any): void {
    this.setBirthDate(event.target.value);
  }

  update(): void{
     if(this.formPerson.form.valid && this.personType.length > 0){
        this.updatePerson();
    }
  }

  searchAddressByZipCode(event: any){
    this.addressApiService.getAddress(event.target.value).subscribe((addressResult : AddressResult) =>
    {
        var address = addressResult.data;
        this.person.setAddress(address.zipCode, address.street, address.number, address.neighborhood, address.complement, address.city, address.state);
    }, (errors) => {
       this.showNotification(errors);
       return;
    })
  }

  private updatePerson() : void{
    this.personApiService.updatePerson(this.person).subscribe(() => {
        this.router.navigate(["/person/list"]);
    }, (errors) => {
        this.showNotification(errors);
        return;
    });
  }

  private showNotification(errors: string[]): void{
    this.errors = errors;
    $('#notificationModal').modal('show');
  }

  private checktPersonTypes(lookups: Lookup[]):void{
    for (let i = 0; i < lookups.length; i++) {
      const resultChecked = this.person.types.find(x => x == lookups[i].name) != null;
      const lookup = new Lookup(lookups[i].id, lookups[i].name, lookups[i].description, resultChecked)
      this.lookups.push(lookup);
      if(resultChecked){
        this.setPersonType(lookup);
      }
    }
  }
}
