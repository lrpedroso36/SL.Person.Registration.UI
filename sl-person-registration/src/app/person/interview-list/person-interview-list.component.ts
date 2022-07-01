import { Component, OnInit } from '@angular/core';
import { InterviewApiService, PeopleResult, Person, PersonApiService } from '..';
declare var $ : any;

@Component({
  selector: 'app-person-interview-list',
  templateUrl: './person-interview-list.component.html',
  styleUrls: ['./person-interview-list.component.css']
})
export class PersonInterviewListComponent implements OnInit {
  people: Person[];
  errors: string[];

  constructor(private personApiService: PersonApiService,
              private interviewApiService: InterviewApiService) { }

  ngOnInit(): void {
  }

  getPeople(event: any) : void {

  }

  getPeopleByPersonType() : void {
    this.personApiService.getPeopleByPersonType('Assistido').subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
        this.showNotification(errors);
    });
  }

  presenceTratament(event: any, person: Person): void{
    event.preventDefault();
    if(confirm('Confirmar presença para o tarefeiro "' + person.name +'"?')){
      this.interviewApiService.interviewPresence(person.documentNumber).subscribe((data: {}) => {
        this.errors = [];
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
