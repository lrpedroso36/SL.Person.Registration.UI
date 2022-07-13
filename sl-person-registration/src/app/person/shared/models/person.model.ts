import { Assignment, Interview, Lookup } from "..";

export class Person {
    public lookupsPersonType: Lookup[] = [];
    public lookupsGenderType: Lookup[] = [];
    public birthDate: string;

    constructor(public id?: string,
                public types?: string[],
                public name?: string,
                public documentNumber?: number,
                public gender?: string,
                birthDate?: string,
                public zipCode?: number,
                public street?: string,
                public number?: string,
                public neighborhood?: string,
                public complement?: string,
                public city?: string,
                public state?: string,
                public ddd?: number,
                public phoneNumber?: number,
                public enabledLaborerPresence? : boolean,
                public laborerPresenceConfirmed? : boolean,
                public tratamentInProcess? : boolean,
                public tratamentPresenceConfirmed? : boolean,
                public enabledTratamentView? : boolean,
                public interviews?: Interview[],
                public assignments? : Assignment[]) 
    {
        this.birthDate = this.getBirthDate(birthDate);
    }

    private getBirthDate(birthDate: string) : string {
        return birthDate === "0001-01-01" ? null : birthDate;
    }

    setGender(gender: string):void{
        if(gender != undefined && gender.length > 0){
            this.gender = gender;
        }
    }

    setBirthDate(birthDate: string): void {
        if(birthDate != undefined && birthDate.length > 0){
            this.birthDate = birthDate;
        }
    }

    setType(type: string): void{
        if(type != null){
            
            if(this.types === undefined)
                this.types = [];

            if(this.types.length === 0){
                this.types.push(type);
            }else if(this.types.find(x => x === type)){
                this.types = this.types.filter(x => x !== type);
            }else if(this.types.find(x => x != type)){
                this.types.push(type);
            }
        }
    }

    getLookupsPersonType(listLookups: Lookup[]): void
    {
      if(this.types === undefined)
         this.types = [];

      for (let i = 0; i < listLookups.length; i++) {
          const resultChecked = this.types === undefined ? false : this.types.find(x => x == listLookups[i].name) != null;
          const lookup = new Lookup(listLookups[i].id, listLookups[i].name, listLookups[i].description, resultChecked);
          this.lookupsPersonType.push(lookup);
        }  
    }

    getLookupsGender(listLookups: Lookup[]): void{
        for (let i = 0; i < listLookups.length; i++) {
            const resultChecked = this.gender === undefined ? false : this.gender === listLookups[i].name;
            const lookup = new Lookup(listLookups[i].id, listLookups[i].name, listLookups[i].description, resultChecked);
            this.lookupsGenderType.push(lookup);
        }  
    }

    setAddress(zipCode: number, street: string, number: string, neighborhood: string, complement: string, city: string, state: string): void {
        this.zipCode = zipCode;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.complement = complement;
        this.city = city;
        this.state = state;
    }

    validateTypes() : boolean {
        return this.types != null && this.types.length > 0;
    }

    validateDocumentNumber() : boolean {
        return this.documentNumber != undefined && this.documentNumber !=0;
    }

    validateName() : boolean {
        return this.name != undefined && this.name != "" && this.name.length > 5;
    }

    validade() : boolean {
        return this.validateTypes() && this.validateDocumentNumber() && this.validateName();
    }
}