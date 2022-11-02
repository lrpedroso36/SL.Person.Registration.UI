import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $ : any;

import { PersonApiService, Person, PersonListService} from '../shared';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {  
  
  constructor(private route: ActivatedRoute,
              private personService: PersonApiService,
              public personList: PersonListService) { 
  }

  ngOnInit(): void {
    var documentNumber = this.route.snapshot.params['documentNumber'];
    if(documentNumber != undefined){
      this.personList.setDocumentNumber(documentNumber);
      this.personList.getPeople();
    }
    this.personList.getLookupsPersonType();
    this.personList.cleanParameters();
  }

  selectPersonType(event: any) : void {
    this.personList.setPersonType(event.target.value);
  }

  selectName(event: any) : void {
    this.personList.setName(event.target.value);
  }

  selectDocumentNumner(event: any): void {
    this.personList.setDocumentNumber(event.target.value);
  }

  getPeople() : void{
    this.personList.getPeople();
    if(this.personList.errors != undefined && this.personList.errors.length > 0){
      this.showNotification(this.personList.errors);
    }
    this.personList.cleanParameters();
    this.personList.getLookupsPersonType();
  }

  deletePerson($event: any, person: Person){
    $event.preventDefault();
    if(confirm('Deseja remover "' + person.name +'"?')){
      this.personService.deletePerson(person.id).subscribe((data: {}) => {
        this.personList.errors = [];
      }, (errors) => { 
        this.showNotification(errors);
      });
    }
  }

  private showNotification(errors: string[]): void{
    this.personList.people = [];
    this.personList.errors = errors;
    $('#notificationModal').modal('show');
  }
}
