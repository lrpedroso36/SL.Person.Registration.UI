import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interview, InterviewApiService, Lookup, LookupApiService, PeopleResult, Person, PersonApiService, PersonResult } from '../../shared';
declare var $ : any;

@Component({
  selector: 'app-person-interview',
  templateUrl: './person-interview.component.html',
  styleUrls: ['./person-interview.component.css']
})
export class PersonInterviewComponent implements OnInit {
  interview = {} as Interview;
  person: Person;
  interviewers: Person[] = [];
  interviewTypes: Lookup[] = [];
  treatmentTypes: Lookup[] = [];
  weakDayTypes: Lookup[] = [];
  errors: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personApiService: PersonApiService,
              private lookupApiService: LookupApiService,
              private interviewApiService: InterviewApiService) { }

  ngOnInit(): void {
    this.interview = new Interview();
    let documentNumber = + this.route.snapshot.params['documentNumber'];
    this.interview.setinterviewedDocument(documentNumber);
    this.getPerson(documentNumber);
    this.getInterviewType();
    this.getTreatmentTypes();
    this.getWeakDayTypes();
    this.getInterviewers();
  }

  clearErros(): void{
    this.errors = [];
  }

  setTreatment(event: any) : void {
      this.interview.setTreatmentType(event.target.value);
  }

  setInterview(event: any) : void {
      this.interview.setType(event.target.value);
  }

  setWeakDay(event: any) : void {
      this.interview.setEwakDayType(event.target.value);
  }

  setPersonInterview(event: any) : void{
      this.interview.setInterviewerDocument(event.target.value);
  }

  get validateInterviewerDocument () : boolean{
    return this.interview.validateInterviewerDocument();
  }

  get validateType () : boolean{
    return this.interview.validateType();
  }

  get validateTreatmentType() : boolean{
    return this.interview.validateTreatmentType();
  }

  get validateAmount() : boolean{
    return this.interview.validateAmount();
  }

  get validateWeakDayType() : boolean{
    return this.interview.validateWeakDayType();
  }

  get validateOpinion () : boolean{
    return this.interview.validateOpinion();
  }

  get validate() : boolean {
    return this.interview.validate();
  }

  insert(): void{
    if(this.interview.validate()){
      this.interviewApiService.insertInsertInterview(this.interview).subscribe((personResult: PersonResult) => {
        this.router.navigate(["/interview/list", this.interview.interviewedDocument]);
      }, (errors) => { this.showNotification(errors) });
    }
  }

  private getPerson(documentNumber: number){
    this.personApiService.getPerson(documentNumber).subscribe((personResult: PersonResult) => {
      this.person = personResult.data;
    }, (errors) => { this.redirectToInterviewList(errors); });
  }

  private getInterviewType(){
    this.lookupApiService.getInterview().subscribe((lookups: Lookup[]) => {
      this.interviewTypes = lookups;
    }, (errors) => { this.redirectToInterviewList(errors); });
  }

  private getTreatmentTypes(){
    this.lookupApiService.getTreatment().subscribe((lookups: Lookup[]) => {
      this.treatmentTypes = lookups;
    }, (errors) => { this.redirectToInterviewList(errors); });
  }

  private getWeakDayTypes(){
    this.lookupApiService.getWeakDay().subscribe((lookups: Lookup[]) => {
      this.weakDayTypes = lookups;
    }, (errors) => { this.redirectToInterviewList(errors); });
  }

  private getInterviewers() {
    this.personApiService.getPeople("Entrevistador", "","").subscribe((peopleResult: PeopleResult) => {
      this.interviewers = peopleResult.data;
    }, (errors) => { this.redirectToInterviewList(errors); });
  };

  private showNotification(errors: string[]): void{
    this.errors = errors;
    $('#notificationModal').modal('show');
  }

  private redirectToInterviewList(errors : string): void{
    console.log(errors);
    this.router.navigate(["/interview/list"]);
  }
}
