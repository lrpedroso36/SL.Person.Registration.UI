import { Person } from "../person.model";

export class PeopleResult {
    constructor(public data : Person[], 
                public errors: string[]) {}
}