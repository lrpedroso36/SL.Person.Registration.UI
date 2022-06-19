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
}
