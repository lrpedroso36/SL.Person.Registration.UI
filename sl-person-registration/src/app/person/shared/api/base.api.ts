import { throwError } from "rxjs";
import { Configuration } from "..";

export abstract class BaseApi{
    public configuration = {} as Configuration;
    constructor(){
        this.configuration = new Configuration();
    }

    public handleError(error: any) {
        let errorMessage = [];
        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.errors;
        } else {
          errorMessage = error.error.errors;
        }
        return throwError(() => {
          return errorMessage;
        });
      }
}