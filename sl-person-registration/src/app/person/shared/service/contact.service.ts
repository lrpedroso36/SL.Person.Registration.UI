import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { Contact } from '../models/contact.model';
import { Result } from '../models/result.model';
import { Configuration } from '../configuration/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    private configuration = {} as Configuration;

    constructor(private httpClient: HttpClient) { 
        this.configuration = new Configuration();
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    insertContact(documentNumber: number, contact: Contact) {
        return this.httpClient.post<Result>(this.configuration.urlApiContact + documentNumber, contact)
        .pipe(retry(2)); 
    }
}
