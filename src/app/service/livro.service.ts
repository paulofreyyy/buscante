import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LivroService {
    // Url da API google books
    private readonly API = 'https://www.googleapis.com/books/v1/volumes'
    constructor(private http: HttpClient) { }

    // Função de buscar livros de acordo com valor informado no front
    buscar(valorDigitado: string) {
        const params = new HttpParams().append('q', valorDigitado)
        return this.http.get(this.API, { params })
    }
}
