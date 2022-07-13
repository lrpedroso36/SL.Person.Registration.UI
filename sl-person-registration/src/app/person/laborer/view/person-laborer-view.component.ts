import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, Person, PersonApiService, PersonResult } from '../../shared';

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
    var id = this.route.snapshot.params['id'];
    this.person = new Person();
    this.getPersonApiService(id);
  }

  private getPersonApiService(id: string) :void {
    this.personApiService.getPerson(id).subscribe((personResult: PersonResult) => {
      this.person = personResult.data;
      this.assignments = personResult.data.assignments;
    },(errors) => { this.redirectToLaborerList(errors); });
  }

  private redirectToLaborerList(errors: string):void{
    console.log(errors);
    this.router.navigate(["laborer/list", this.person.id]);
  }
}
