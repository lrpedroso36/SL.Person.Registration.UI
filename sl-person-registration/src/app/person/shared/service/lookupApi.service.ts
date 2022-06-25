import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Lookup } from '../models/lookup.model';
import { BaseApiService } from './baseApiService';

@Injectable({
  providedIn: 'root'
})
export class LookupApiService extends BaseApiService {

  constructor(private httpClient: HttpClient) {
    super();
   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPersonType() : Observable<Lookup[]>{
    var urlLookupPersonType = `${this.configuration.urlApiLookup}/person`;
    return this.httpClient.get<Lookup[]>(urlLookupPersonType)
      .pipe(retry(2), catchError(this.handleError));
  }

  getGender() : Observable<Lookup[]>{
    var urlGender = `${this.configuration.urlApiLookup}/gender`;
    return this.httpClient.get<Lookup[]>(urlGender)
      .pipe(retry(2), catchError(this.handleError));
  }

  getInterview() : Observable<Lookup[]>{
    var urlInterview = `${this.configuration.urlApiLookup}/interview`;
    return this.httpClient.get<Lookup[]>(urlInterview)
      .pipe(retry(2), catchError(this.handleError));
  }

  getTreatment() : Observable<Lookup[]>{
    var ulrTratament = `${this.configuration.urlApiLookup}/treatment`;
    return this.httpClient.get<Lookup[]>(ulrTratament)
      .pipe(retry(2), catchError(this.handleError));
  }

  getWeakDay() : Observable<Lookup[]>{
    var urlWaekDay = `${this.configuration.urlApiLookup}/weakDay`;
    return this.httpClient.get<Lookup[]>(urlWaekDay)
      .pipe(retry(2), catchError(this.handleError));
  }
}
