import { Tratament } from "./tratament.model";

export class Interview {
    public id: string;
    public interviewerDocument: number;
    public interviewedDocument: number;
    public treatmentType: string;
    public weakDayType: string;
    public type: string;
    public amount: number;
    public opinion: string;
    public interviewer: string;
    public status: string;
    public date: string;
    public trataments: Tratament[] = [];

    constructor() {

    }
    
    setInterviewerDocument(document: number) : void {
        this.interviewerDocument = document;
    }

    setinterviewedDocument(document: number) : void {
        this.interviewedDocument = document;
    }

    setTreatmentType(treatment: string) : void {
        this.treatmentType = treatment;
    }

    setEwakDayType(weakDay: string) : void {
        this.weakDayType = weakDay;
    }

    setType (type: string) : void {
        this.type = type;
    }

    validateInterviewerDocument() : boolean{
        return this.interviewerDocument != undefined && this.interviewerDocument != 0;
    }

    validateInterviewedDocument(): boolean {
        return this.interviewedDocument != undefined && this.interviewedDocument != 0;
    }

    validateTreatmentType() :boolean{
        return this.treatmentType != undefined && this.treatmentType != "";
    }

    validateWeakDayType(): boolean {
        return this.weakDayType != undefined && this.weakDayType != "";
    }

    validateType() :boolean {
        return this.type != undefined && this.type != "";
    }

    validateAmount() :boolean {
        return this.amount != undefined && this.amount != 0;
    }

    validateOpinion() :boolean {
        return this.opinion != undefined && this.opinion != "" && this.opinion.length > 10;
    }

    validate() : boolean {
        return this.validateInterviewerDocument() && 
               this.validateTreatmentType() &&
               this.validateWeakDayType()  &&
               this.validateType() &&
               this.validateAmount() &&
               this.validateOpinion();
    }
}