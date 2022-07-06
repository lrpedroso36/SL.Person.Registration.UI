import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interview, Person, PersonApiService, PersonResult } from '..';

@Component({
  selector: 'app-person-interview-view',
  templateUrl: './person-interview-view.component.html',
  styleUrls: ['./person-interview-view.component.css']
})
export class PersonInterviewViewComponent implements OnInit {
  person: Person;
  interviews: Interview[];
  interview: Interview;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personApiService: PersonApiService) { }

  ngOnInit(): void {
    let documentNumber = + this.route.snapshot.params['documentNumber'];
    this.getPerson(documentNumber);
    this.interview = new Interview();
  }

  showDetails(interview: Interview): void{
    this.interview = interview;
  }

  private getPerson(documentNumber: number) {
    this.personApiService.getPerson(documentNumber).subscribe((personResult: PersonResult) => {
      this.person = personResult.data;
      this.interviews = personResult.data.interviews;
      }, (errors) => { this.redirectToPersonList(errors); });
    }

    private redirectToPersonList(errors : string): void{
      console.log(errors);
      this.router.navigate(["/interview/list", this.person.documentNumber]);
  }
}
