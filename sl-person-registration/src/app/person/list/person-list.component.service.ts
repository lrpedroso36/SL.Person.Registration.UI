import { Injectable } from "@angular/core";
import { Lookup, LookupApiService, PeopleResult, Person, PersonApiService } from "..";

@Injectable({
  providedIn: 'root'
})

export class PersonListComponentService{
  name: string;
  personType: string;
  documentNumber: string;

  errors: string[];
  people: Person[] = [];
  lookups: Lookup[] = [];

  constructor(private personService: PersonApiService,
              private lookupService: LookupApiService) { }

  get validateSelectParameters() :boolean {
    var result = this.validateSelectPersonType() || this.validateSelectName() || this.validateSelectDocumentNumber();
    return result;
  }

  get validateName() :boolean{
    return !this.validateSelectName() && this.validateSelectDocumentNumber();
  }

  get validateDocumentNumber(): boolean {
    return this.validateSelectName() && !this.validateSelectDocumentNumber();
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

  getPeople(): void{
    var parameter = this.getParameter();

    if(parameter == undefined){
      this.getPeopleType(this.personType);
    }
    else if(this.personType == "" && parameter != undefined){
      this.getPeopleParameter(parameter);
    }else{
      this.getPeopleParameterAndType(this.personType, parameter);
    }
  }

  getPersonType(){
    this.lookupService.getPersonType().subscribe((lookups: Lookup[]) => {
      this.lookups = lookups;
    }, (errors) => { this.errors = errors });
  }

  cleanParameters() : void {
    this.personType = "";
    this.name = "";
    this.documentNumber = "";
  }

  private getParameter(): string {
    if(this.validateSelectName() && !this.validateSelectDocumentNumber())
      return this.name;
    else if(!this.validateSelectName() && this.validateSelectDocumentNumber())
      return this.documentNumber;

    return undefined;
  }

  private getPeopleParameter(parameter: string):void{
    this.personService.getPeopleParameter(parameter).subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
      this.errors = errors;
    });
  }

  private getPeopleType(type: string):void{
    this.personService.getPeopleByPersonType(type).subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
      this.errors = errors;
    });
  }

  private getPeopleParameterAndType(type: string, parameter: string):void{
    this.personService.getPeopleParameterAndType(type, parameter).subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
       this.errors = errors;
    });
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