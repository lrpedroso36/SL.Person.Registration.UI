export class Configuration {
    public urlApiPerson : string;
    public urlApiContact : string;
    public urlApiLookup : string;
    public urlApiAddress : string;
    public urlApiAssignment : string;
    public urlApiInterview: string;

    constructor(){
        this.urlApiPerson ="http://localhost:5001/api/v1/person/";
        this.urlApiContact="http://localhost:5001/api/v1/contact/";
        this.urlApiLookup = "http://localhost:5001/api/v1/lookup";
        this.urlApiAddress = "http://localhost:5001/api/v1/address/";
        this.urlApiAssignment = "http://localhost:5001/api/v1/assignment/";
        this.urlApiInterview = "http://localhost:5001/api/v1/interview";
    }
}