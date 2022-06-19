import { Person } from "./person.model";

export class PersonSingle {
    constructor(public data : Person,
                public errors: string[]) {}
}