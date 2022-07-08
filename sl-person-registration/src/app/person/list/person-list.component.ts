import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $ : any;

import { PersonApiService, Person, PeopleResult, AssignmentApiService, Lookup, LookupApiService} from '../shared';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  lookups: Lookup[] = [];
  people: Person[] = [];
  errors: string[] = [];
  private personType: string;
  private name: string;
  private documentNumber: string;

  constructor(private route: ActivatedRoute,
              private personService: PersonApiService,
              private lookupApiService: LookupApiService) { }

  ngOnInit(): void {
    let documentNumber = this.route.snapshot.params['documentNumber'];
    if(documentNumber != undefined){
    }
    this.getPersonType();
  }

  get validateSelectParameters() :boolean {
    return this.validateSelectPersonType() || this.validateSelectName() || this.validateSelectDocumentNumber();
  }

  get validateName() :boolean{
    return !this.validateSelectName() && this.validateSelectDocumentNumber();
  }

  get validateDocumentNumber(): boolean {
    return this.validateSelectName() && !this.validateSelectDocumentNumber();
  }

  selectPersonType(event: any) : void {
    var parameter = event.target.value;
    if(parameter.length >0){
      this.personType = event.target.value;
    }
  }

  selectName(event: any) : void {
    var parameter = event.target.value;
    if(parameter != null && parameter.length >= 3){
      this.name = parameter;
    }
  }

  selectDocumentNumner(event: any): void {
    var parameter = event.target.value
    if(parameter != undefined && parameter.length >= 3){
      this.documentNumber = parameter;
    }
  }

  getPeople() : void{
    var parameter = this.getParameter();

    if(parameter == undefined){
      this.getPeopleType(this.personType);
    }
    else{
      this.getPeopleParameterAndType(this.personType, parameter);
    }
  }

  deletePerson($event: any, person: Person){
    $event.preventDefault();
    if(confirm('Deseja remover "' + person.name +'"?')){
      this.personService.deletePerson(person.documentNumber).subscribe((data: {}) => {
        this.errors = [];
      }, (errors) => { 
        this.showNotification(errors);
      });
    }
  }

  private getParameter(): string {
    if(this.validateSelectName() && !this.validateSelectDocumentNumber())
      return this.name;
    else if(!this.validateSelectName() && this.validateSelectDocumentNumber())
      return this.documentNumber;

    return undefined;
  }

  private validateSelectPersonType(): boolean{
    return this.personType != undefined && this.personType.length > 0;
  }

  private validateSelectName() : boolean{
    return this.name != undefined && this.name.length > 3;
  }

  private validateSelectDocumentNumber() : boolean{
    return this.documentNumber != undefined && this.documentNumber.length > 3;
  }

  private getPeopleType(type: string):void{
      this.personService.getPeopleByPersonType(type).subscribe((peopleResult: PeopleResult) => {
        this.people = peopleResult.data;
      }, (errors) => {
          this.showNotification(errors);
      });
  }

  private getPeopleParameterAndType(type: string, parameter: string):void{
    this.personService.getPeopleParameterAndType(type, parameter).subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
        this.showNotification(errors);
    });
  }

  private getPersonType(){
    this.lookupApiService.getPersonType().subscribe((lookups: Lookup[]) => {
      this.lookups = lookups;
    }, (errors) => { this.showNotification(errors); });
  }

  private showNotification(errors: string[]): void{
    this.errors = errors;
    this.people = [];
    this.personType, this.name, this.documentNumber = undefined;
    $('#notificationModal').modal('show');
  }
}
