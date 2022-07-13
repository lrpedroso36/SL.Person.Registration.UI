import { Injectable, OnInit } from "@angular/core";
import { Lookup, LookupApiService, PeopleResult, Person, PersonApiService, PersonResult } from "..";

@Injectable({
  providedIn: 'root'
})

export class PersonListComponentService implements OnInit{
  name: string;
  personType: string;
  documentNumber: string;

  errors: string[];
  people: Person[] = [];
  lookups: Lookup[] = [];

  constructor(private personService: PersonApiService,
              private lookupService: LookupApiService) { }

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
    this.lookupService.getPersonType().subscribe((lookups: Lookup[]) => {
      this.lookups = lookups;
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