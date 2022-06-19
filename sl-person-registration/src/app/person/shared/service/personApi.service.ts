import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { PersonList } from '../models/personList.model';
import { Person } from '../models/person.model';
import { Result } from '../models/result.model';
import { BaseApiService } from './baseApiService';

@Injectable({
  providedIn: 'root'
})
export class PersonApiService extends BaseApiService {
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPeopleParameter(parameter : string) : Observable<PersonList> {
    var urlGetPeopleParameter = `${this.configuration.urlApiPerson}list/${parameter}`;
    return this.httpClient.get<PersonList>(urlGetPeopleParameter)
      .pipe(retry(1), catchError(super.handleError))
  }

  insertPerson(person: Person) : Observable<Result> {
      return this.httpClient.post<Result>(this.configuration.urlApiPerson, person)
      .pipe(retry(1), catchError(this.handleError));
  }

  deletePerson(documentNumber: number) : Observable<Result>{
    return this.httpClient.delete<Result>(this.configuration.urlApiPerson + documentNumber)
      .pipe(retry(1), catchError(this.handleError));
  }
}
