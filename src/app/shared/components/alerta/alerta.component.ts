import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "dio-alerta",
    templateUrl: "./alerta.component.html",
    styleUrls: ["./alerta.component.scss"],
})
export class AlertaComponent implements OnInit {
    valuesModal = {
        titulo: "Sucesso!",
        descricao: "Seu registro cadastrado com sucesso!",
        btnSucces: "OK",
        btnCancel: "Cancelar",
        canViewCancelar: false,
        btnColor: "primary",
    };

    constructor(
        public dialogRef: MatDialogRef<AlertaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
      this.valuesModal = Object.assign(this.valuesModal, this.data);
    }
}
