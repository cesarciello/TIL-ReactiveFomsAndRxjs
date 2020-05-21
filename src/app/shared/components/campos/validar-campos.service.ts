import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ValidarCamposService {
    constructor() {}

    validadeField(control: AbstractControl, errorName: string): boolean {
        return (
            (control.touched || control.dirty) &&
            this.hasError(control, errorName)
        );
    }

    hasError(control: AbstractControl, errorName: string): boolean {
        return control.hasError(errorName);
    }

    lengthField(control: AbstractControl, errorName: string): number{
        const error = control.errors[errorName];
        return error.requiredLength || error.min || error.max || 0;
    }
}
