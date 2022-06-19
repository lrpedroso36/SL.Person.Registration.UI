export class Configuration {
    urlApiPerson : string;
    urlApiContact : string;

    constructor(){
        this.urlApiPerson ="http://localhost:5001/api/v1/person/";
        this.urlApiContact="http://localhost:5001/api/v1/contact/";
    }
}