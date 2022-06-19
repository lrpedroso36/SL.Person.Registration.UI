export class Address {

    constructor(public zipCode?: number,
        public street?: string,
        public number?: string,
        public neighborhood?: string,
        public complement?: string,
        public city?: string,
        public state?: string){
    }
}