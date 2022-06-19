import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var $ : any;

import { Person, Lookup, Contact, LookupService, PersonService, ContactService, Result } from '../shared';

@Component({
  selector: 'app-person-insert',
  templateUrl: './person-insert.component.html',
  styleUrls: ['./person-insert.component.css']
})
export class PersonInsertComponent implements OnInit {
  private insertPersonIsSuccess = false;
  private isnertContactIsSucess = false;

  @ViewChild('formPerson', { static: true }) formPerson: NgForm;
  
  person = {} as Person;
  lookups: Lookup[] = [];

  personType: string[] = [];
  errors: string[] = [];

  constructor(private router: Router,
              private lookupService: LookupService,
              private personService: PersonService,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.person = new Person();
    this.getPersonType();
  }

  getPersonType(){
    this.lookupService.getPersonType().subscribe((resultLookups: Lookup[]) => {
      this.lookups = resultLookups;
    })
  }

  setGender(event: any) :void{
    this.person.gender = event.target.value;
  } 

  setPersonType(event: any): void {
     let type = event.target.value;

     if(this.personType.length === 0){
       this.personType.push(type);
     }else if(this.personType.find(x => x === type)){
      this.personType = this.personType.filter(x => x !== type);
     }else if(this.personType.find(x => x != type)){
       this.personType.push(type);
     }

     this.person.types = this.personType;
  }

  setBirthDate(event: any): void {
    let dateString = event.target.value;
    this.person.birthDate = dateString;
  }

  insert(): void{
    if(this.formPerson.form.valid && this.personType.length > 0){
        this.insertPerson();

        if(this.insertPersonIsSuccess){
          this.insertContact();
        }

        if(!this.isnertContactIsSucess)
        {
          this.deletePerson();
        }

        if(this.insertPersonIsSuccess && this.isnertContactIsSucess){
          this.router.navigate(["/person/list"]);
        }
    }
  }

  private insertPerson() : void{
    this.personService.insertPerson(this.person).subscribe((result: Result) => {
    }, (exception) => {
      this.errors = exception.error.errors 
      $('#notificationModal').modal('show');
    })
    this.insertPersonIsSuccess = true;
  }

  private insertContact(): void {
    let contact = new Contact(this.person.ddd, this.person.phoneNumber);
    if(contact.isValid()){
      this.contactService.insertContact(this.person.documentNumber, contact)
         .subscribe((result: Result) => {
         }, (exception) => {
           this.errors = exception.error.errors;
           $('#notificationModal').modal('show');
         });
    }
    this.isnertContactIsSucess = true;
  }

  private deletePerson(): void {
    this.personService.deletePerson(this.person.documentNumber).subscribe((result: Result) => {
    }, (exception) => { 
     console.log(exception);
    });
  }
}
