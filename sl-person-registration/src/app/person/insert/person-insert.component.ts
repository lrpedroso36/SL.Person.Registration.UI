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

  errors: string[] = [];

  constructor(private router: Router,
              private lookupApiService: LookupApiService,
              private personApiService: PersonApiService,
              private addressApiService: AddressApiService) { }

  ngOnInit(): void {
    this.person = new Person();
    this.getPersonType();
    this.getGenderType();
  }

  clearErros(): void{
    this.errors = [];
  }

  setGender(event: any) :void{
    this.person.setGender(event.target.value);
  } 

  setPersonType(event: any): void {
    if(event.target.value !== undefined){
      this.person.setType(event.target.value);
    }
  }

  setBirthDate(event: any): void {
    if(event.target.value === undefined){
      this.setBirthDate(event.target.value);
    }
  }

  get getTypes() : boolean{
    return this.person.types === undefined || this.person.types.length > 0;
  }

  insert(): void{
     if(this.formPerson.form.valid && (this.person.types != undefined && this.person.types.length > 0)){
        this.insertPerson();
    }
  }

  searchAddressByZipCode(event: any){
    this.addressApiService.getAddress(event.target.value).subscribe((addressResult : AddressResult) =>{
        var address = addressResult.data;
        this.person.setAddress(address.zipCode, address.street, address.number, address.neighborhood, address.complement, address.city, address.state);
    }, (errors) => {
       this.showNotification(errors);
       return;
    })
  }

  private insertPerson() : void{
    this.personApiService.insertPerson(this.person).subscribe(() => {
        this.router.navigate(["/person/list", this.person.documentNumber]);
    }, (errors) => {
        this.showNotification(errors);
        return;
    });
  }

  private getPersonType(){
    this.lookupApiService.getPersonType().subscribe((lookups: Lookup[]) => {
      this.person.getLookupsPersonType(lookups);
    }, (errors) => { this.redirectToPersonList(errors); });
  }

  private getGenderType(){
    this.lookupApiService.getGender().subscribe((lookups:Lookup[]) => {
      this.person.getLookupsGender(lookups);
    }, (errors) => { this.redirectToPersonList(errors); });
  }

  private showNotification(errors: string[]): void{
    this.errors = errors;
    $('#notificationModal').modal('show');
  }

  private redirectToPersonList(errors : string): void{
    console.log(errors);
    this.router.navigate(["/person/list"]);
  }
}
