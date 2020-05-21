import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidarCamposService } from "src/app/shared/components/campos/validar-campos.service";
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';

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
        public validacao: ValidarCamposService,
        private fb: FormBuilder,
        public filmeService: FilmesService
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
            data =>  alert("SUCESSO!"),
            error =>  alert("ERROR!")
        );
    }

}
