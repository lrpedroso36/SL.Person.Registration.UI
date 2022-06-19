import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { Lookup } from '../models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private url = "http://localhost:5001/api/v1";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPersonType() : Observable<Lookup[]>{
    return this.httpClient.get<Lookup[]>(this.url + '/lookup/person')
      .pipe(retry(2));
  }
}
