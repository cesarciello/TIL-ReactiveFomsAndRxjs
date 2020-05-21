import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {

  @Input() titulo: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() opcoes: Array<{ value: string, field: string }>;

  constructor(public validacao: ValidarCamposService) {}

  get formControl(): AbstractControl {
      return this.formGroup.controls[this.controlName];
  }

}
