import { Person } from "./person.model";

export class PersonList {
    constructor(public data : Person[], 
                public errors: string[]) {}
}