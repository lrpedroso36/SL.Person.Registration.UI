import { Component, OnInit } from '@angular/core';
import { AssignmentApiService, Lookup, LookupApiService, PeopleResult, Person, PersonApiService } from '..';
declare var $ : any;

@Component({
  selector: 'app-person-laborer',
  templateUrl: './person-laborer.component.html',
  styleUrls: ['./person-laborer.component.css']
})
export class PersonLaborerComponent implements OnInit {
  errors: string[];
  people: Person[];
  lookups: Lookup[];
  
  private name: string;
  private personType: string;
  private documentNumber: string;

  constructor(private personApiService : PersonApiService,
              private lookupApiService: LookupApiService,
              private assigmentApiService: AssignmentApiService) { }

  ngOnInit(): void {
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

  presenceAssignment($event: any, person: Person){
    $event.preventDefault();
    if(confirm('Confirmar presença para o tarefeiro "' + person.name +'"?')){
      this.assigmentApiService.insertAssigment(person.documentNumber).subscribe((data: {}) => {
        this.errors = [];
        this.getPeopleName(person.name.substring(0,3))
      }, (errors) => { 
        this.showNotification(errors);
        this.getPeopleName(person.name.substring(0,3))
      });
    }
  }

  private getPeopleType(type: string):void{
      this.personApiService.getPeopleByPersonType(type).subscribe((peopleResult: PeopleResult) => {
        this.people = peopleResult.data;
      }, (errors) => {
          this.showNotification(errors);
      });
  }

  private getPeopleParameterAndType(type: string, parameter: string):void{
    this.personApiService.getPeopleParameterAndType(type, parameter).subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
        this.showNotification(errors);
    });
  }

  private getPeopleName(parameter: string) : void {
    this.personApiService.getPeopleParameter(parameter).subscribe((peopleResult: PeopleResult) => {
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

  private showNotification(errors: string[]): void{
    this.errors = errors;
    this.people = [];
    $('#notificationModal').modal('show');
  }
}
