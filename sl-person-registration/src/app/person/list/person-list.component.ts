import { Component, OnInit } from '@angular/core';
declare var $ : any;

import { PersonApiService, Person, PeopleResult} from '../shared';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];
  errors: string[] = [];

  constructor(private personService: PersonApiService) { }

  ngOnInit(): void {
  }

  getPeople(event: any) {
    var parameter = event.target.value;
    if(parameter != null && parameter.length > 0){
      this.personService.getPeopleParameter(event.target.value).subscribe((peopleResult: PeopleResult) => {
        this.people = peopleResult.data;
      }, (errors) => {
          this.showNotification(errors);
      });
    }
  }

  deletePerson($event: any, person: Person){
    $event.preventDefault();
    if(confirm('Deseja remover "' + person.name +'"?')){
      this.personService.deletePerson(person.documentNumber).subscribe((data: {}) => {
        this.errors = [];
        this.people = [];
      }, (errors) => { 
        this.showNotification(errors);
      });
    }
  }

  private showNotification(errors: string[]): void{
    this.errors = errors;
    this.people = [];
    $('#notificationModal').modal('show');
  }
}
