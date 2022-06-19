import { Person } from "../person.model";

export class PersonResult {
    constructor(public data : Person,
                public errors: string[]) {}
}