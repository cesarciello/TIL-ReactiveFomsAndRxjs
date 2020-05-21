import { Component, Input } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { ValidarCamposService } from "../validar-campos.service";

@Component({
    selector: "dio-input-number",
    templateUrl: "./input-number.component.html",
    styleUrls: ["./input-number.component.scss"],
})
export class InputNumberComponent {
    @Input() titulo: string;
    @Input() controlName: string;
    @Input() formGroup: FormGroup;
    @Input() max = 10;
    @Input() min = 0;
    @Input() step = 1;

    constructor(public validacao: ValidarCamposService) {}

    get formControl(): AbstractControl {
        return this.formGroup.controls[this.controlName];
    }
}
