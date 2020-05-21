import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Filme } from '../shared/models/filme';

const URL = 'http://localhost:3000/filmes';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(public http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(URL, filme);
  }
}
