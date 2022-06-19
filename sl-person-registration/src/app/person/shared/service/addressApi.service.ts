import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Address } from '..';
import { AddressResult } from '../models/result/addressResult.model';
import { BaseApiService } from './baseApiService';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService extends BaseApiService {

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
