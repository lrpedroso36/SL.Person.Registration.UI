import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Person } from '../models/person.model';
import { Result } from '../models/result.model';
import { BaseApiService } from './baseApiService';
import { PeopleResult } from '../models/result/peopleResult.model';
import { PersonResult } from '..';

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

  getPeopleParameter(parameter : string) : Observable<PeopleResult> {
    var urlGetPeopleParameter = `${this.configuration.urlApiPerson}list/${parameter}`;
    return this.httpClient.get<PeopleResult>(urlGetPeopleParameter)
      .pipe(retry(1), catchError(super.handleError))
  }

  getPeopleParameterAndType(type: string, parameter: string) : Observable<PeopleResult> {
    var urlGetPeopleParameter = `${this.configuration.urlApiPerson}list/${parameter}?personType=${type}`;
    return this.httpClient.get<PeopleResult>(urlGetPeopleParameter)
      .pipe(retry(1), catchError(super.handleError))
  }

  getPeopleByPersonType(personType : string) : Observable<PeopleResult> {
    var urlGetPeopleParameter = `${this.configuration.urlApiPerson}list-persontype/${personType}`;
    return this.httpClient.get<PeopleResult>(urlGetPeopleParameter)
      .pipe(retry(1), catchError(super.handleError))
  }

  getPerson(documentNumber: number) : Observable<PersonResult>{
    var urlGetPerson = `${this.configuration.urlApiPerson}${documentNumber}`;
    return this.httpClient.get<PersonResult>(urlGetPerson)
      .pipe(retry(1), catchError(super.handleError));
  }

  insertPerson(person: Person) : Observable<Result> {
      return this.httpClient.post<Result>(this.configuration.urlApiPerson, person)
      .pipe(retry(1), catchError(this.handleError));
  }

  updatePerson(person: Person) : Observable<Result>{
    return this.httpClient.put<Result>(this.configuration.urlApiPerson, person)
      .pipe(retry(1), catchError(this.handleError));
  }

  deletePerson(documentNumber: number) : Observable<Result>{
    return this.httpClient.delete<Result>(this.configuration.urlApiPerson + documentNumber)
      .pipe(retry(1), catchError(this.handleError));
  }
}
