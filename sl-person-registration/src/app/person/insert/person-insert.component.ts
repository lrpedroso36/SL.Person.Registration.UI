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
  searchAddress: boolean = false;

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
  
  get validateTypes() : boolean{
    return this.person.validateTypes();
  }

  get validateName() : boolean {
    return this.person.validateName();
  }

  get validateDocumentNumber() : boolean {
    return this.person.validateDocumentNumber();
  }

  get validate() :boolean{
    return this.person.validade();
  }

  get searchAddressInProcess() : boolean {
    return this.searchAddress;
  }

  insert(): void{
     if(this.person.validade()){
        this.insertPerson();
    }
  }

  searchAddressByZipCode(event: any){
    this.searchAddress = true;
    this.addressApiService.getAddress(event.target.value).subscribe((addressResult : AddressResult) =>{
        var address = addressResult.data;
        this.person.setAddress(address.zipCode, address.street, address.number, address.neighborhood, address.complement, address.city, address.state);
        this.searchAddress = false;
    }, (errors) => {
       this.showNotification(errors);
       this.searchAddress = false;
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
