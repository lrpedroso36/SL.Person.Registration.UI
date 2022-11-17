import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../shared';

declare var $ : any;

@Component({
  selector: 'app-person-workschedule-list',
  templateUrl: './person-workschedule-list.component.html',
  styleUrls: ['./person-workschedule-list.component.css']
})
export class PersonWorkscheduleListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public personService: PersonService) { }

  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];
    if(id != undefined && id != ""){
      this.personService.getPeopleById(id);
    }
    this.personService.getLookupsPersonType();
    this.personService.cleanParameters();
  }

  selectPersonType(event: any) : void {
    this.personService.setPersonType(event.target.value);
  }

  selectName(event: any) : void {
    this.personService.setName(event.target.value);
  }

  selectDocumentNumner(event: any): void {
    this.personService.setDocumentNumber(event.target.value);
  }

  getPeople() : void {
    this.personService.getPeople();

    if(this.personService.errors != undefined && this.personService.errors.length > 0){
      this.showNotification(this.personService.errors);
    }
    this.personService.cleanParameters();
    this.personService.getLookupsPersonType();
  }

  private showNotification(errors: string[]): void{
    this.personService.people = [];
    this.personService.errors = errors;
    $('#notificationModal').modal('show');
  }
}
