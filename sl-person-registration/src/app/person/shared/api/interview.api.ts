import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Interview, Result } from '..';
import { BaseApi } from './base.api';

@Injectable({
  providedIn: 'root'
})
export class InterviewApi extends BaseApi {

  constructor(private httpClient: HttpClient) { 
    super();
  }

  insertInsertInterview(interview: Interview) {
    var url = `${this.configuration.urlApiInterview}?interviewedId=${interview.interviewedId}&interviewerId=${interview.interviewerId}`
    return this.httpClient.post<Result>(url, interview)
    .pipe(retry(1), catchError(this.handleError));
  }

  interviewPresence(id: string) {
    var url = `${this.configuration.urlApiInterview}/presence/${id}`
    return this.httpClient.post<Result>(url, null)
    .pipe(retry(1), catchError(this.handleError));
  }
}
