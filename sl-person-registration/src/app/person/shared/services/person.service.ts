import { Injectable, OnInit } from "@angular/core";

import { Lookup } from "../models/lookup.model";
import { Person } from "../models/person.model";
import { Result } from "../models/result/result.model";
import { PeopleResult } from "../models/result/peopleResult.model";
import { PersonResult } from "../models/result/personResult.model";
import { PersonApi } from "../api/person.api";
import { LookupApi } from "../api/lookup.api";

@Injectable({
    providedIn: 'root'
  })

export class PersonService implements OnInit{
    name: string;
    personType: string;
    documentNumber: string;
  
    errors: string[];
    people: Person[] = [];
    lookups: Lookup[] = [];
  
    constructor(private personService: PersonApi,
                private lookupApi: LookupApi) { }
  
    ngOnInit(): void {
     this.cleanParameters();
     this.getLookupsPersonType();
    }
  
    get validateSelectParameters() :boolean {
      var result = this.validateSelectPersonType() || this.validateSelectName() || this.validateSelectDocumentNumber();
      return result;
    }
  
    setPersonType(personType: string): void {
        this.personType = personType;
    }
  
    setName(name: string) : void {
      if(name != undefined && name.length >= 3){
        this.name = name;
      }
    }
  
    setDocumentNumber(documentNumber: string) : void {
      if(documentNumber != undefined && documentNumber.length >= 3){
        this.documentNumber = documentNumber;
      }
    }  
  
    cleanParameters() : void {
      this.personType = "";
      this.name = "";
      this.documentNumber = "";
    }
  
    getPeople(): void{
      this.personService.getPeople(this.personType, this.name, this.documentNumber).subscribe((peopleResult: PeopleResult) => {
        this.people = peopleResult.data;
      }, (errors) => {
        this.errors = errors;
      });
    }
  
    getPeopleById(id: string): void{
      this.personService.getPerson(id).subscribe((personResult: PersonResult) => {
        this.people = []      
        this.people.push(personResult.data);
      }, (errors) => {
        this.errors = errors;
      });
    }
  
    getLookupsPersonType(){
      this.lookupApi.getPersonType().subscribe((lookups: Lookup[]) => {
        this.lookups = lookups;
      }, (errors) => { this.errors = errors });
    }

    deletePerson(person: Person){
      this.personService.deletePerson(person.id).subscribe((data: Result) => {
        this.errors = data.errors;
      }, (errors) => { this.errors = errors });
    }
    
    private validateSelectPersonType(): boolean{
      return this.personType != "";
    }
  
    private validateSelectName() : boolean{
      return this.name != "" && this.name.length > 3;
    }
  
    private validateSelectDocumentNumber() : boolean{
      return this.documentNumber != "" && this.documentNumber.length > 3;
    }
}