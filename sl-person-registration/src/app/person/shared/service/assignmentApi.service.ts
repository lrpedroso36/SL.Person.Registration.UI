import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Result } from '../models/result.model'


import { BaseApiService } from './baseApiService';

@Injectable({
  providedIn: 'root'
})
export class AssignmentApiService extends BaseApiService {

  constructor(private httpClient: HttpClient) {
    super();
   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  insertAssigment(documentNumber: number) : Observable<Result> {
    var urlGetPerson = `${this.configuration.urlApiAssignment}${documentNumber}`;
    return this.httpClient.put<Result>(urlGetPerson, null)
        .pipe(retry(1), catchError(this.handleError));
    }
}
