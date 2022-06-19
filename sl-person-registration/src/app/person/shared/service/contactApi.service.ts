import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { Contact } from '../models/contact.model';
import { Result } from '../models/result.model';
import { BaseApiService } from './baseApiService';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService extends BaseApiService {
    constructor(private httpClient: HttpClient) { 
        super();
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    insertContact(documentNumber: number, contact: Contact) {
        var urlInsertContact = `${this.configuration.urlApiContact}${documentNumber}`;
        return this.httpClient.post<Result>(urlInsertContact, contact)
        .pipe(retry(1), catchError(this.handleError)); 
    }
}
