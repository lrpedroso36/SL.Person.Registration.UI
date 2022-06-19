export class Person {
    private listTypes: string[];

    constructor(public types?: string[],
                public name?: string,
                public documentNumber?: number,
                public gender?: string,
                public birthDate?: string,
                public street?: string,
                public number?: string,
                public neighborhood?: string,
                public complement?: string,
                public city?: string,
                public state?: string,
                public ddd?: number,
                public phoneNumber?: number) 
    {
        this.listTypes = [];
    }

    setGender(gender: string):void{
        if(gender != null && gender.length > 0){
            this.gender = gender;
        }
    }

    setBirthDate(birthDate: string): void {
        if(birthDate != null && birthDate.length > 0){
            this.birthDate = birthDate;
        }
    }

    setType(type: string): void{
        if(type != null && type.length > 0){
            if(this.listTypes.length === 0){
                this.listTypes.push(type);
            }else if(this.listTypes.find(x => x === type)){
                this.listTypes = this.listTypes.filter(x => x !== type);
            }else if(this.listTypes.find(x => x != type)){
                this.listTypes.push(type);
            }
            this.types = this.listTypes;
        }
    }
}