import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewApiService, PeopleResult, Person, PersonApiService, PersonListComponentService } from '..';
declare var $ : any;

@Component({
  selector: 'app-person-interview-list',
  templateUrl: './person-interview-list.component.html',
  styleUrls: ['./person-interview-list.component.css']
})
export class PersonInterviewListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private interviewApiService: InterviewApiService,
              public personList: PersonListComponentService) { }

  ngOnInit(): void {
    var documentNumber = this.route.snapshot.params['documentNumber'];
    if(documentNumber != undefined){
      this.personList.setDocumentNumber(documentNumber);
      this.personList.getPeople();
    }
    this.personList.getPersonType();
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

  getPeople() : void {
    this.personList.getPeople();

    if(this.personList.errors != undefined && this.personList.errors.length > 0){
      this.showNotification(this.personList.errors);
    }
    this.personList.cleanParameters();
  }

  presenceTratament(event: any, person: Person): void{
    event.preventDefault();
    if(confirm('Confirmar presença para o tarefeiro "' + person.name +'"?')){
      this.interviewApiService.interviewPresence(person.documentNumber).subscribe((data: {}) => {
        this.personList.setName(person.name.substring(0,4));
        this.personList.getPeople();
        this.personList.cleanParameters();
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
