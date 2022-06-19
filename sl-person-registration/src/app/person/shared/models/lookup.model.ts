export class Lookup {
    constructor(public id: number,
                public name: string,
                public description: string,
                public checked: boolean  = false){
                }

    setChecked(checked: boolean){
        this.checked = checked;
    }
}