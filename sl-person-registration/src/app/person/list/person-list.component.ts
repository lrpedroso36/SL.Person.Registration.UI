import { Component, OnInit } from '@angular/core';

import { PersonService, Person, PersonList, Result} from '../shared';

declare var $ : any;

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  person = {} as Person;

  people: Person[] = [];

  errors: string[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  getPeople(event: any) {
      this.personService.getPersonParameter(event.target.value).subscribe((personList: PersonList) => {
        this.people = personList.data;
        this.errors = [];
        return;
      }, (exception) => { 
        this.errors = exception.error.errors 
        this.people = [];
        $('#notificationModal').modal('show');
      });
    }

  deletePerson($event: any, person: Person){
    $event.preventDefault();
    if(confirm('Deseja remover "' + person.name +'"?')){
      this.personService.deletePerson(person.documentNumber).subscribe((result: Result) => {
        this.errors = [];
        this.people = [];
        return;
      }, (exception) => { 
        this.errors = exception.error.errors 
        this.people = [];
        $('#notificationModal').modal('show');
      });
    }
  }
}
