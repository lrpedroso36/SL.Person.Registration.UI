import { Tratament } from "./tratament.model";

export class Interview {
    public id: string;
    public interviewerId: string;
    public interviewedId: string;
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
    
    setInterviewerId(id: string) : void {
        this.interviewerId = id;
    }

    setinterviewedId(id: string) : void {
        this.interviewedId = id;
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

    get getStatus(): boolean{
        return this.status == "Concluído";
    }

    validateInterviewerId() : boolean{
        return this.interviewerId != "";
    }

    validateInterviewedId(): boolean {
        return this.interviewedId != "";
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
        return this.validateInterviewerId() && 
               this.validateTreatmentType() &&
               this.validateWeakDayType()  &&
               this.validateType() &&
               this.validateAmount() &&
               this.validateOpinion();
    }
}