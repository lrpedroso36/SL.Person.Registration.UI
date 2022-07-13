import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interview, Person, PersonApiService, PersonResult } from '../../shared';

@Component({
  selector: 'app-person-interview-view',
  templateUrl: './person-interview-view.component.html',
  styleUrls: ['./person-interview-view.component.css']
})
export class PersonInterviewViewComponent implements OnInit {
  person: Person;
  interviews: Interview[];
  interview: Interview;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private personApiService: PersonApiService) { }

  ngOnInit(): void {
    this.person = new Person();
    this.interview = new Interview();
    var id = this.route.snapshot.params['id'];
    this.getPerson(id);
  }

  showDetails(interview: Interview): void{
    this.interview = interview;
  }

  private getPerson(id: string) {
    this.personApiService.getPerson(id).subscribe((personResult: PersonResult) => {
      this.person = personResult.data;
      this.interviews = personResult.data.interviews;
      }, (errors) => { this.redirectToInterviewList(errors); });
    }

    private redirectToInterviewList(errors : string): void{
      console.log(errors);
      this.router.navigate(["/interview/list", this.person.id]);
  }
}