import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidarCamposService } from "src/app/shared/components/campos/validar-campos.service";
import { Filme } from "src/app/shared/models/filme";
import { FilmesService } from "src/app/core/filmes.service";
import { MatDialog } from "@angular/material/dialog";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { Router } from "@angular/router";

@Component({
    selector: "dio-cadastro-filmes",
    templateUrl: "./cadastro-filmes.component.html",
    styleUrls: ["./cadastro-filmes.component.scss"],
})
export class CadastroFilmesComponent implements OnInit {
    cadastro: FormGroup;

    opcoes = [
        {
            value: "Ação",
            field: "Ação",
        },
        {
            value: "Aventura",
            field: "Aventura",
        },
        {
            value: "Ficção Científica",
            field: "Ficção Científica",
        },
        {
            value: "Romance",
            field: "Romance",
        },
        {
            value: "Terror",
            field: "Terror",
        },
    ];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        public dialog: MatDialog,
        public filmeService: FilmesService,
        public validacao: ValidarCamposService
    ) {}

    get f() {
        return this.cadastro.controls;
    }

    ngOnInit() {
        this.cadastro = this.fb.group({
            titulo: [
                "",
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(256),
                ],
            ],
            urlFoto: ["", [Validators.minLength(10)]],
            dtLancamento: ["", [Validators.required]],
            descricao: [""],
            nota: [
                0,
                [Validators.required, Validators.max(10), Validators.min(0)],
            ],
            urlIMDB: ["", [Validators.minLength(10)]],
            select: ["", [Validators.required]],
        });
    }

    submit() {
        this.cadastro.markAllAsTouched();
        if (this.cadastro.invalid) {
            return;
        }
        const filme = this.cadastro.getRawValue() as Filme;
        this.salvar(filme);
    }

    reniciarForm() {}

    private salvar(filme: Filme): void {
        this.filmeService.salvar(filme).subscribe(
            (data) => {
                const config = {
                    data: {
                        btnSucces: "Ir para listagem",
                        btnCancel: "Cadastrar novo filme",
                        canViewCancelar: true,
                    },
                };
                const dialogRef = this.dialog.open(AlertaComponent, config);
                dialogRef.afterClosed().subscribe((data) => {
                    if (data) {
                        this.router.navigateByUrl("/");
                    } else {
                        this.cadastro.reset();
                    }
                });
            },
            (error) => {
                const config = {
                    data: {
                        titulo: "Erro ao salvar o registro.",
                        descricao:
                            "Não conseguimos salvar seu registro, favor tentar novamente mais tarde.",
                        btnSucces: "Fechar",
                        btnColor: "warn",
                    },
                };
                this.dialog.open(AlertaComponent, config);
            }
        );
    }
}
