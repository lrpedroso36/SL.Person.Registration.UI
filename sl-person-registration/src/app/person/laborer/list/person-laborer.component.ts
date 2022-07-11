import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonListComponentService } from '../../list';
import { AssignmentApiService, Person } from '../../shared';
declare var $ : any;

@Component({
  selector: 'app-person-laborer',
  templateUrl: './person-laborer.component.html',
  styleUrls: ['./person-laborer.component.css']
})
export class PersonLaborerComponent implements OnInit {
    
  constructor(private route: ActivatedRoute,
              private assigmentApiService: AssignmentApiService,
              public personList: PersonListComponentService) { }

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

  presenceAssignment($event: any, person: Person){
    $event.preventDefault();
    if(confirm('Confirmar presença para o tarefeiro "' + person.name +'"?')){
      this.assigmentApiService.insertAssigment(person.documentNumber).subscribe((data: {}) => {
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
