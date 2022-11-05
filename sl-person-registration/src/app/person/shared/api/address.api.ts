import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { AddressResult } from '../models/result/addressResult.model';
import { BaseApi } from './base.api';

@Injectable({
  providedIn: 'root'
})
export class AddressApi extends BaseApi {

  constructor(private httpClient: HttpClient) { 
    super();
  }

  getAddress(zipCode: string): Observable<AddressResult>{
    var urlGetAddress = `${this.configuration.urlApiAddress}${zipCode}`;
    console.log(urlGetAddress);
    return this.httpClient.get<AddressResult>(urlGetAddress)
      .pipe(retry(1), catchError(super.handleError))
  }
}
