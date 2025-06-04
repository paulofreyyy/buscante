import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
    selector: 'app-lista-livros',
    templateUrl: './lista-livros.component.html',
    styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {
    listaLivros: [];
    campoBusca: string = ''
    subscription: Subscription

    constructor(private service: LivroService) { }

    buscarLivros() {
        this.subscription = this.service.buscar(this.campoBusca).subscribe({
            next: (res) => {
                console.log(res)
            },
            error: (err) => {
                console.error(err)
            },
            complete: () => {
                console.log('Observable completado')
            }
        })
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }

}



