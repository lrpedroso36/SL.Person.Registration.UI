import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Interview, Result } from '..';
import { AddressResult } from '../models/result/addressResult.model';
import { BaseApiService } from './baseApiService';

@Injectable({
  providedIn: 'root'
})
export class InterviewApiService extends BaseApiService {

  constructor(private httpClient: HttpClient) { 
    super();
  }

  insertInsertInterview(interview: Interview) {
    var url = `${this.configuration.urlApiInterview}?interviewedDocument=${interview.interviewedDocument}&interviewerDocument=${interview.interviewerDocument}`
    return this.httpClient.post<Result>(url, interview)
    .pipe(retry(1), catchError(this.handleError));
  }

  interviewPresence(documentNumber: number) {
    var url = `${this.configuration.urlApiInterview}/presence/${documentNumber}`
    return this.httpClient.post<Result>(url, null)
    .pipe(retry(1), catchError(this.handleError));
  }
}
