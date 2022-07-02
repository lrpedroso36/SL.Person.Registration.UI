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

  constructor(private route: ActivatedRoute,
              private personService: PersonApiService,
              private assigmentApiService: AssignmentApiService,
              private lookupApiService: LookupApiService) { }

  ngOnInit(): void {
    let documentNumber = this.route.snapshot.params['documentNumber'];
    if(documentNumber != undefined){
      this.getPeopleInService(documentNumber);
    }
    this.getPersonType();
  }

  getPeople(event: any) {
    var parameter = event.target.value;
    this.getPeopleInService(parameter);
  }

  selectPersonType(event: any) : void {
    this.personType = event.target.value;
  }

  get validateSelectPersonType(): boolean{
    return this.personType != undefined && this.personType.length >0;
  }

  getPeopleByPersonType():void{
    this.personService.getPeopleByPersonType(this.personType).subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
        this.showNotification(errors);
    });
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

  private getPeopleInService(parameter: string):void{
    if(parameter != null && parameter.length >= 3){
      this.personService.getPeopleParameter(parameter).subscribe((peopleResult: PeopleResult) => {
        this.people = peopleResult.data;
      }, (errors) => {
          this.showNotification(errors);
      });
    }
  }

  private getPersonType(){
    this.lookupApiService.getPersonType().subscribe((lookups: Lookup[]) => {
      this.lookups = lookups;
    }, (errors) => { this.showNotification(errors); });
  }

  private showNotification(errors: string[]): void{
    this.errors = errors;
    this.people = [];
    $('#notificationModal').modal('show');
  }
}
