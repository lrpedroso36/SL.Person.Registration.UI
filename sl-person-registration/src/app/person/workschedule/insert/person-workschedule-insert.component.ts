import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lookup, LookupApi, Person, PersonApi, PersonResult, WorkScheduleApi } from '../..';

@Component({
  selector: 'app-person-workschedule-insert',
  templateUrl: './person-workschedule-insert.component.html',
  styleUrls: ['./person-workschedule-insert.component.css']
})
export class PersonWorkscheduleInsertComponent implements OnInit {
  person: Person;
  weakDayTypes: Lookup[] = [];
  errors: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workScheduleApi: WorkScheduleApi,
              private lookupApi: LookupApi,
              private personApi: PersonApi) { }

  ngOnInit(): void {
    var id =  this.route.snapshot.params['id'];
    this.getPerson(id);
    this.getWeakDayTypes();
  }

  
  get validate() : boolean {
    return true;
  }

  get validateWorkSchedule() : boolean {
    return true;
  }

  get validateWeakDayType() : boolean{
    return true;
  }

  get validateDate(): boolean{
    return true;
  }

  setWeakDay(event: any) : void {
    // this.interview.setEwakDayType(event.target.value);
  }

  setWorkShcheduleDate(event: any): void {
    if(event.target.value === undefined){
      //this.setBirthDate(event.target.value);
    }
  }

  setDoTheReading(event: any): void {

  }

  insert(): void {

  }

  insertWorkSchedule(): void {

  }

  clearErros(): void{
    this.errors = [];
  }

  private getPerson(id: string){
    this.personApi.getPerson(id).subscribe((personResult: PersonResult) => {
      this.person = personResult.data;
    }, (errors) => { this.redirectToWorkScheduleList(errors); });
  }

  private getWeakDayTypes(){
    this.lookupApi.getWeakDay().subscribe((lookups: Lookup[]) => {
      this.weakDayTypes = lookups;
    }, (errors) => { this.redirectToWorkScheduleList(errors); });
  }

  private redirectToWorkScheduleList(errors : string): void{
    console.log(errors);
    this.router.navigate(["/workschedule/list"]);
  }
}
