export class Contact {
    constructor(public ddd?: number,
                public phoneNumber? : number){}

    isValid():boolean {
        let resultValidateDD = (this.ddd != null && this.ddd != 0);
        let resultValidatePhoneNumber = (this.phoneNumber != null && this.phoneNumber != 0);
        return resultValidateDD && resultValidatePhoneNumber;
    }
}