import { catchError, debounceTime, EMPTY, filter, map, of, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Item, Livro, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-lista-livros',
    templateUrl: './lista-livros.component.html',
    styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
    campoBusca = new FormControl()
    mensagemErro = ''
    livrosResultado: LivrosResultado

    constructor(private service: LivroService) { }

    totalDeLivros$ = this.campoBusca.valueChanges
        .pipe(
            debounceTime(300),
            filter((valorDigitado) => valorDigitado.length >= 3),
            switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
            map(resultado => this.livrosResultado = resultado),
            catchError(erro => {
                return of()
            })
        )

    livrosEncontrados$ = this.campoBusca.valueChanges
        .pipe(
            debounceTime(300),
            filter((valorDigitado) => valorDigitado.length >= 3),
            switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
            map(resultado => resultado.items ?? []),
            map((items) => this.livrosResultadoParaLivros(items)),
            catchError((erro) => {
                return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro'))
            })
        )

    livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
        return items.map(item => {
            return new LivroVolumeInfo(item)
        })
    }
}



