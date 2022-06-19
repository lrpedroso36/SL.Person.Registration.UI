import { Address } from "../address.model";

export class AddressResult{
    constructor(public data: Address,
                public errors: []){

    }
}