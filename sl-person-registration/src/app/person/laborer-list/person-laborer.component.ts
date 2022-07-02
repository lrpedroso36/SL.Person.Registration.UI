import { Component, OnInit } from '@angular/core';
import { AssignmentApiService, PeopleResult, Person, PersonApiService } from '..';
declare var $ : any;

@Component({
  selector: 'app-person-laborer',
  templateUrl: './person-laborer.component.html',
  styleUrls: ['./person-laborer.component.css']
})
export class PersonLaborerComponent implements OnInit {
  errors: string[];
  people: Person[];

  constructor(private personApiService : PersonApiService,
              private assigmentApiService: AssignmentApiService) { }

  ngOnInit(): void {
  }
  
  getPeople(event: any){
    var parameter = event.target.value;
    this.getPeopleInService(parameter);
  }

  getPeopleByPersonType() {
    this.getPeopleByPersonTypeInApi();
  }

  presenceAssignment($event: any, person: Person){
    $event.preventDefault();
    if(confirm('Confirmar presença para o tarefeiro "' + person.name +'"?')){
      this.assigmentApiService.insertAssigment(person.documentNumber).subscribe((data: {}) => {
        this.errors = [];
        this.getPeopleInService(person.name.substring(0,5))
      }, (errors) => { 
        this.showNotification(errors);
        this.getPeopleInService(person.name.substring(0,5))
      });
    }
  }

  private getPeopleInService(parameter: string){
    if(parameter != null && parameter.length >= 3){
      this.personApiService.getPeopleParameterAndType('Tarefeiro', parameter).subscribe((peopleResult: PeopleResult) => {
        this.people = peopleResult.data;
      }, (errors) => {
          this.showNotification(errors);
      });
    }
  }

  private getPeopleByPersonTypeInApi(){
    this.personApiService.getPeopleByPersonType('Tarefeiro').subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
        this.showNotification(errors);
    });
  }

  private showNotification(errors: string[]): void{
    this.errors = errors;
    this.people = [];
    $('#notificationModal').modal('show');
  }
}
