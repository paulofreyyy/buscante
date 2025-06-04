## Programação reativa:
Programação reativa é um termo amplo, que não está restrito a uma linguagem ou a um framework específicos e pode inclusive ser utilizada no front ou backend. A programação reativa pode ser considerada um paradigma de programação ou modelo de arquitetura que se refere basicamente à manipulação de um fluxo de dados (streams) ou eventos de forma assíncrona.

Assim, a programação reativa se faz necessária em aplicações que precisam lidar de forma assíncrona com dados, quando fazemos uma requisição à API, por exemplo, e precisamos esperar esse retorno e também em programas que precisam processar informações em tempo real.

Dessa forma, escrevemos código que possa “reagir” às mudanças que acontecem (como eventos de cliques, dados sendo buscados, etc). Para isso, podemos utilizar a biblioteca RxJS, criada para construção de programas assíncronos ou baseados em eventos, através de uma sequência de observables.

## Observable e Observer (Pub/Sub)
Observable: fonte de dados assíncronos, que pode emitir valores ao longo do tempo. Pode emitir:
- Valor único
- Vários valores
- Nenhum valor

É usado para:
- Respostas de requisições HTTP
- Eventos de usuário
- Streams de dados em tempo real

Observer: escuta e reage aos dados emitidos pelo Observable. Quando:
- Chega um valor (next)
- Acontece um erro (error)
- O fluxo é finalizado (complete)

Exemplo simples:
import { Observable } from 'rxjs';

const observable = new Observable<string>(subscriber => {
  subscriber.next('Olá');
  subscriber.next('Mundo');
  subscriber.complete();
});

observable.subscribe({
  next: valor => console.log('Valor:', valor),
  error: erro => console.error('Erro:', erro),
  complete: () => console.log('Concluído!')
});

Unsubscribe: Interrompe o recebimento de dados e libera recursos, evitando vazamento de memória.

Quando fazer um Unsubscribe?
- Observables que não completam sozinhos, como:
    - interval(), timer(), fromEvent(), websockets
- Observables de serviços que ficam ativos enquanto o componente está em tela.

Não é necessário em casos:
- Observables de métodos http, pois se completam automaticamente após a resposta.

Resumo:
- Prefira usar o AsyncPipe no HTML sempre que puder.
- Para observables no TypeScript, use takeUntil() + Subject para unsubscribe seguro.
- Cuidado com observables de eventos (fromEvent, interval) — sempre unsubscribe.
- Observables HTTP não precisam de unsubscribe manual.

## Pipe e Tap
Pipe: metodo que permite encadear operadores RxJS para transformar, filtrar ou manipular os dados quem um Observable emite. Funciona como um 'encanamento' de operações, onde cada operador processa o dado antes de enviá-lo.

Exemplo com pipe():
this.service.getData()
  .pipe(
    map(data => data.nome),  // transforma o dado
    filter(nome => nome.length > 3)  // filtra
  )
  .subscribe(nome => console.log(nome));

Cada operador dentro do pipe() transforma ou atua sobre o fluxo de dados.

Tap: Operador usado para executar efeitos colaterais sem alterar o dado que passa pelo fluxo. Muito útil para:
- Fazer console.log de depuração
- Mostrar loaders
- Executar ações paralelas (Ex. armazenar no cache)
O tap() não altera o valor, apenas monitora o fluxo.

Exemplo com tap():
this.service.getData()
  .pipe(
    tap(() => console.log('Requisição iniciada')),
    map(data => data.resultado),
    tap(resultado => console.log('Dados recebidos:', resultado))
  )
  .subscribe();