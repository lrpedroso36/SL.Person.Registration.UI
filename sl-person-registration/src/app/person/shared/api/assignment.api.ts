import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { BaseApi } from './base.api';
import { Result } from '../models/result/result.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentApi extends BaseApi {

  constructor(private httpClient: HttpClient) {
    super();
   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  insertAssigment(id: string) : Observable<Result> {
    var urlGetPerson = `${this.configuration.urlApiAssignment}${id}`;
    return this.httpClient.put<Result>(urlGetPerson, null)
        .pipe(retry(1), catchError(this.handleError));
    }
}
