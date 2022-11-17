import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { BaseApi } from './base.api';
import { Result } from '../models/result/result.model';
import { WorkSchedule } from '../models/workscheduel.model';

@Injectable({
  providedIn: 'root'
})
export class WorkScheduleApi extends BaseApi {

  constructor(private httpClient: HttpClient) {
    super();
   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  insert(id: string, workshchedules: WorkSchedule[]) : Observable<Result> {
    var url = `${this.configuration.urlApiWorkSchedule}${id}`;
    return this.httpClient.post<Result>(url, workshchedules)
        .pipe(retry(1), catchError(this.handleError));
    }
}