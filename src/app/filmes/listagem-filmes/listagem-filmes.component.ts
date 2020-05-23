import { Component, OnInit } from "@angular/core";
import { FilmesService } from "src/app/core/filmes.service";
import { Filme } from "src/app/shared/models/filme";

@Component({
    selector: "dio-listagem-filmes",
    templateUrl: "./listagem-filmes.component.html",
    styleUrls: ["./listagem-filmes.component.scss"],
})
export class ListagemFilmesComponent implements OnInit {
    filmes: Filme[] = [];
    page = 0;
    readonly limit = 4;

    constructor(public filmeService: FilmesService) {}

    ngOnInit() {
        this.listarFilmes();
    }

    onScroll() {
        this.listarFilmes();
    }

    private listarFilmes() {
        this.page++;
        this.filmeService
            .listar(this.page, this.limit)
            .subscribe((filmes) => this.filmes.push(...filmes));
    }
}
