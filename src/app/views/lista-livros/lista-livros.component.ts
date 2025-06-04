import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
    selector: 'app-lista-livros',
    templateUrl: './lista-livros.component.html',
    styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

    listaLivros: [];
    campoBusca: string = ''

    constructor(private service: LivroService) { }

    // Função para realizar a busca por livros criada na service
    buscarLivros(){
        this.service.buscar(this.campoBusca)
    }

}



