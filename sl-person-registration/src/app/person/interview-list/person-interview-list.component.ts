import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private name: string;
  private personType: string;
  private documentNumber: string;

  constructor(private route: ActivatedRoute,
              private personApiService: PersonApiService,
              private interviewApiService: InterviewApiService) { }

  ngOnInit(): void {
    var documentNumber = this.route.snapshot.params['documentNumber'];
    if(documentNumber != undefined){
      this.getPeopleInService(documentNumber);
    }
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

  getPeople(event: any) : void {
    var parameter = event.target.value;
    this.getPeopleInService(parameter);
  }

  getPeopleByPersonType() : void {
    this.getPeopleByPersonTypeInService();
  }

  presenceTratament(event: any, person: Person): void{
    event.preventDefault();
    if(confirm('Confirmar presença para o tarefeiro "' + person.name +'"?')){
      this.interviewApiService.interviewPresence(person.documentNumber).subscribe((data: {}) => {
        this.errors = [];
        this.getPeopleInService(person.name.substring(0,5))
      }, (errors) => { 
        this.showNotification(errors);
        this.getPeopleInService(person.name.substring(0,5))
      });
    }
  }

  private getPeopleByPersonTypeInService() : void {
    this.personApiService.getPeopleByPersonType('Assistido').subscribe((peopleResult: PeopleResult) => {
      this.people = peopleResult.data;
    }, (errors) => {
        this.showNotification(errors);
    });
  }
  
  private getPeopleInService(parameter: string): void{
    if(parameter != null && parameter.length >= 3){
      this.personApiService.getPeopleParameter(parameter).subscribe((peopleResult: PeopleResult) => {
        this.people = peopleResult.data;
      }, (errors) => {
          this.showNotification(errors);
      });
    }
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
