import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { PersonList } from '../models/personList.model';
import { Person } from '../models/person.model';
import { Result } from '../models/result.model';
import { Configuration } from '../configuration/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private configuration = {} as Configuration;

  constructor(private httpClient: HttpClient) { 
    this.configuration = new Configuration();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPersonParameter(parameter : string) : Observable<PersonList> {
    return this.httpClient.get<PersonList>(this.configuration.urlApiPerson + 'list/' + parameter)
      .pipe(retry(2))
  }

  insertPerson(person: Person) : Observable<Result> {
      return this.httpClient.post<Result>(this.configuration.urlApiPerson, person)
      .pipe(retry(2));
  }

  deletePerson(documentNumber: number) : Observable<Result>{
    return this.httpClient.delete<Result>(this.configuration.urlApiPerson + documentNumber)
      .pipe(retry(2));
  }
}
