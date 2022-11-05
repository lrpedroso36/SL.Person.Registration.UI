import { Injectable, OnInit } from "@angular/core";
import { Lookup, LookupApi } from "..";

@Injectable({
    providedIn: 'root'
})

export class LookupService implements OnInit{
    errors: string[];
    lookups: Lookup[] = [];

    constructor(private lookupApi: LookupApi) { }

    ngOnInit(): void { }

    getLookupsPersonType() {
        this.lookupApi.getPersonType().subscribe((result: Lookup[]) => {
          console.log(result);
          this.lookups = result;
        }, (errors) => { this.errors = errors });
      }
}