import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var $ : any;

import { Person, Lookup, Contact, LookupApiService, PersonApiService, ContactApiService } from '../shared';

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
              private contactApiService: ContactApiService) { }

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
     if(this.formPerson.form.valid && this.personType.length > 0){
        this.insertPerson();
    }
  }

  private insertPerson() : void{
    this.personApiService.insertPerson(this.person).subscribe(() => {
      let contact = new Contact(this.person.ddd, this.person.phoneNumber);
      if(contact.isValid()){
        this.contactApiService.insertContact(this.person.documentNumber, contact)
          .subscribe(() => {
          }, (errors) => {
              this.showNotification(errors);
              this.deletePerson();
              return;
          });
        }
        this.router.navigate(["/person/list"]);
    }, (errors) => {
        this.showNotification(errors);
        return;
    });
  }

  private deletePerson(): void {
    this.personApiService.deletePerson(this.person.documentNumber).subscribe(() => {
    }, (exception) => { 
      console.log(exception);
    });
  }

  private showNotification(errors: string[]): void{
    this.errors = errors;
    $('#notificationModal').modal('show');
  }
}
