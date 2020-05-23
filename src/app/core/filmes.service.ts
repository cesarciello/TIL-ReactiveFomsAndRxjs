import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Filme } from "../shared/models/filme";

const URL = "http://localhost:3000/filmes";

@Injectable({
    providedIn: "root",
})
export class FilmesService {
    constructor(public http: HttpClient) {}

    salvar(filme: Filme): Observable<Filme> {
        return this.http.post<Filme>(URL, filme);
    }

    listar(page: number, limit: number): Observable<Filme[]> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set("_page", page.toString())
        httpParams = httpParams.set("_limit", limit.toString());
        return this.http.get<Filme[]>(URL, { params: httpParams });
    }
}
