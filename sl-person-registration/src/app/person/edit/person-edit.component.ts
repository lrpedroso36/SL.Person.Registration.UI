import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
  errors: string[] = [];
  searchAddress: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personApiService: PersonApiService,
              private lookupApiService: LookupApiService,
              private addressApiService: AddressApiService) { }

  ngOnInit(): void {
    let documentNumber = + this.route.snapshot.params['documentNumber'];
    this.getPerson(documentNumber);
  }

  clearErros(): void{
    this.errors = [];
  }

  setGender(event: any) :void{
    this.person.setGender(event.target.value);
  } 

  setPersonType(event: any): void {
     this.person.setType(event.target.value);
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

  update(): void{
     if(this.person.validade()){
        this.updatePerson();
    }
  }

  searchAddressByZipCode(event: any){
    this.searchAddress = true;
    this.addressApiService.getAddress(event.target.value).subscribe((addressResult : AddressResult) => {
        var address = addressResult.data;
        this.person.setAddress(address.zipCode, address.street, address.number, address.neighborhood, address.complement, address.city, address.state);
        this.searchAddress = false;
    }, (errors) => {
       this.showNotification(errors);
       this.searchAddress = false;
       return;
    })
  }

  private getPerson(documentNumber: number) {
    this.personApiService.getPerson(documentNumber).subscribe((personResult: PersonResult) => {
      var person = personResult.data;
      this.person = new Person(person.types, person.name, person.documentNumber, person.gender, person.birthDate, person.zipCode,
        person.street, person.number, person.neighborhood, person.complement, person.city, person.state, person.ddd, person.phoneNumber);
        this.getPersonType();
        this.getGenderType();
      }, (errors) => { this.redirectToPersonList(errors); });
    }

  private updatePerson() : void{
    this.personApiService.updatePerson(this.person).subscribe(() => {
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
