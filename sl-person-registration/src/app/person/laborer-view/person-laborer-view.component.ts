import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, Person, PersonApiService, PersonResult, Result } from '..';

@Component({
  selector: 'app-person-laborer-view',
  templateUrl: './person-laborer-view.component.html',
  styleUrls: ['./person-laborer-view.component.css']
})
export class PersonLaborerViewComponent implements OnInit {
  person: Person;
  assignments: Assignment[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private personApiService: PersonApiService) { }

  ngOnInit(): void {
    let documentNumber = + this.route.snapshot.params['documentNumber'];
    this.getPersonApiService(documentNumber);
  }

  private getPersonApiService(documentNumber: number) :void {
    this.personApiService.getPerson(documentNumber).subscribe((personResult: PersonResult) => {
      this.person = personResult.data;
      this.assignments = personResult.data.assignments;
    },(errors) => { this.redirectToLaborerList(errors); });
  }

  private redirectToLaborerList(errors: string):void{
    console.log(errors);
    this.router.navigate(["laborer/list", this.person.documentNumber]);
  }
}
