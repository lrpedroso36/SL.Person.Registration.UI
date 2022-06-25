import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lookup, LookupApiService, Person, PersonApiService, PersonResult } from '..';

@Component({
  selector: 'app-person-interview',
  templateUrl: './person-interview.component.html',
  styleUrls: ['./person-interview.component.css']
})
export class PersonInterviewComponent implements OnInit {
  person: Person;
  interviewTypes: Lookup[] = [];
  treatmentTypes: Lookup[] = [];
  weakDayTypes: Lookup[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personApiService: PersonApiService,
              private lookupApiService: LookupApiService) { }

  ngOnInit(): void {
    let documentNumber = + this.route.snapshot.params['documentNumber'];
    this.getPerson(documentNumber);
    this.getInterviewType();
    this.getTreatmentTypes();
    this.getWeakDayTypes();
  }

  setTreatment(event: any) : void {

  }

  setInterview(event: any) : void {

  }

  setWeakDay(event: any) : void {

  }

  private getPerson(documentNumber: number){
    this.personApiService.getPerson(documentNumber).subscribe((personResult: PersonResult) => {
      this.person = personResult.data;
    }, (errors) => { this.redirectToPersonList(errors); });
  }

  private getInterviewType(){
    this.lookupApiService.getInterview().subscribe((lookups: Lookup[]) => {
      this.interviewTypes = lookups;
    }, (errors) => { this.redirectToPersonList(errors); });
  }

  private getTreatmentTypes(){
    this.lookupApiService.getTreatment().subscribe((lookups: Lookup[]) => {
      this.treatmentTypes = lookups;
    }, (errors) => { this.redirectToPersonList(errors); });
  }

  private getWeakDayTypes(){
    this.lookupApiService.getWeakDay().subscribe((lookups: Lookup[]) => {
      this.weakDayTypes = lookups;
    }, (errors) => { this.redirectToPersonList(errors); });
  }

  private redirectToPersonList(errors : string): void{
    console.log(errors);
    this.router.navigate(["/person/list"]);
  }
}
