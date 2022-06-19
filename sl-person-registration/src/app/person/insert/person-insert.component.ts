import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var $ : any;

import { Person, Lookup, LookupApiService, PersonApiService, AddressApiService, Address } from '../shared';
import { AddressResult } from '../shared/models/result/addressResult.model';

@Component({
  selector: 'app-person-insert',
  templateUrl: './person-insert.component.html',
  styleUrls: ['./person-insert.component.css']
})
export class PersonInsertComponent implements OnInit {

  @ViewChild('formPerson', { static: true }) formPerson: NgForm;
  
  person = {} as Person;
  lookups: Lookup[] = [];

  personType: string[] = [];
  errors: string[] = [];

  constructor(private router: Router,
              private lookupApiService: LookupApiService,
              private personApiService: PersonApiService,
              private addressApiService: AddressApiService) { }

  ngOnInit(): void {
    this.person = new Person();
    this.getPersonType();
  }

  clearErros(): void{
    this.errors = [];
  }

  getPersonType(){
    this.lookupApiService.getPersonType().subscribe((resultLookups: Lookup[]) => {
      this.lookups = resultLookups;
    })
  }

  setGender(event: any) :void{
    this.person.setGender(event.target.value);
  } 

  setPersonType(event: any): void {
     this.person.setType(event.target.value);
     this.personType = this.person.types;
  }

  setBirthDate(event: any): void {
    this.setBirthDate(event.target.value);
  }

  insert(): void{
    console.log(this.person);
     if(this.formPerson.form.valid && this.personType.length > 0){
        this.insertPerson();
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

  private insertPerson() : void{
    this.personApiService.insertPerson(this.person).subscribe(() => {
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
}
