// tabuleiro do xadrez, os v's representam os espaços vazios,

/*
    v v v v v v v v
    v v v v v v v v
    v v v v v v v v
    v v v v v v v v
    v v v v v v v v
    v v v v v v v v
    v v v v v v v v
    v v v v v v v v
*/

//função para o tabuleiro n*n sendo n um número inteiro passado por parâmetro
function criaTabuleiro(n) {
  tabuleiro = new Array(n);
  for (let i = 0; i < n; i++) {
    tabuleiro[i] = new Array(n).fill('v');
  }
  return tabuleiro;
}

//imprimir o tabuleiro no terminal
function imprimeTabuleiro(tabuleiro) {
  let tblr = '';
  for (let linha = 0; linha < 8; linha++) {
    for (let coluna = 0; coluna < 8; coluna++) {
      tblr += tabuleiro[linha][coluna] + ' ';
    }
    tblr += '\n';
  }
  console.log(tblr);
}

//o cavalo pode fazer 8 movimentos
// 1- -> -> \/ , 2- -> -> /\ ,3- /\ /\ ->
//,4- /\ /\ <-,5- \/ \/ -> ,6- \/ \/ <-,
// 7- <- <- \/ , 8 - <- <- /\
//os movimentos estão armazenados nos arrays abaixo como uma forma de 

let movL = [2, 1, -1, -2, -2, -1, 1, 2];
let movC = [1, 2, 2, 1, -1, -2, -2, -1];

//receber o codigo e convertelo para uma posição da tabela

function converteEntrada(pos) {
  //divindo a entrada em dois elementos separados
  let LinhaColuna = pos.split('');
  //o número é decrementado pois o array começa do 0
  LinhaColuna[1] = LinhaColuna[1] - 1;

  if (LinhaColuna[1] > 7 || LinhaColuna[1] < 0) {
    console.log('linha invalida, confira os dados e chame a função novamente!');
    return false;
  } else {
    switch (LinhaColuna[0]) {
      case 'a':
        LinhaColuna[0] = 0;
        break;
      case 'b':
        LinhaColuna[0] = 1;
        break;
      case 'c':
        LinhaColuna[0] = 2;
        break;
      case 'd':
        LinhaColuna[0] = 3;
        break;
      case 'e':
        LinhaColuna[0] = 4;
        break;
      case 'f':
        LinhaColuna[0] = 5;
        break;
      case 'g':
        LinhaColuna[0] = 6;
        break;
      case 'h':
        LinhaColuna[0] = 7;
        break;

      default:
        console.log(
          'Coluna invalida, confira os dados e chame a função novamente!',
        );
        return false;
    }
  }
  return LinhaColuna;
}
//função para converter as cordenadas da matriz para a notação algébrica do xadrez
function converterSaida(linha, coluna) {
  let notacaoAlg = new Array(2).fill(0);

  switch (coluna) {
    case 0:
      notacaoAlg[0] = 'a';
      break;
    case 1:
      notacaoAlg[0] = 'b';
      break;
    case 2:
      notacaoAlg[0] = 'c';
      break;
    case 3:
      notacaoAlg[0] = 'd';
      break;
    case 4:
      notacaoAlg[0] = 'e';
      break;
    case 5:
      notacaoAlg[0] = 'f';
      break;
    case 6:
      notacaoAlg[0] = 'g';
      break;
    case 7:
      notacaoAlg[0] = 'h';
      break;
    default:
      break;
  }
  switch (linha) {
    case 0:
      notacaoAlg[1] = '1';
      break;
    case 1:
      notacaoAlg[1] = '2';
      break;
    case 2:
      notacaoAlg[1] = '3';
      break;
    case 3:
      notacaoAlg[1] = '4';
      break;
    case 4:
      notacaoAlg[1] = '5';
      break;
    case 5:
      notacaoAlg[1] = '6';
      break;
    case 6:
      notacaoAlg[1] = '7';
      break;
    case 7:
      notacaoAlg[1] = '8';
      break;
    default:
      break;
  }
  return notacaoAlg.join('');
}

//função para testar se a futura posição é válida e se ela está vazia
function validacao(lin, col, tabuleiro) {
  if (
    lin >= 0 &&
    lin < 8 &&
    col >= 0 &&
    col < 8 &&
    tabuleiro[lin][col] == 'v'
  ) {
    return true;
  }
  return false;
}

//função recursiva para checar a próxima posição, e movimentar o cavalo,
//o número e movimento são chechados e é determina se a função continua ou não, se
//a execução continuar, uma estrutura de repetição é chamada para verificar os novos possiveis movimentos
function movimentacao(lin, col, movimento, tabuleiro) {
tabuleiro[lin][col] = movimento
console.log(converterSaida(lin,col))
movimentosFeitos.push(converterSaida(lin, col))
if(movimento == 64){
  return false
}
else{
  for(i=0;i<tabuleiro.length;i++){
    let proxLinha =lin+ movL[i]
    let proxColuna =  col+movC[i]
    if(validacao(proxLinha,proxColuna,tabuleiro) == true){
      movimentacao(proxLinha,proxColuna,1+movimento,tabuleiro)
    }
  }
}
}
//Função do passeio do cavalo, que ira receber uma notação algébica referente à posição inicial do 
//cavalo, com isso era criará um tabuleiro novo, um array para armazenar os movimentos feitos, 
// a entrada é convertida e a funcção de movimento é chamada com a posiçaõ inciale e o tabuleiro criado
function PasseioDoCavalo(pos) {
  limpaTabuleiro()
  let tabuleiro = criaTabuleiro(8);
  movimentosFeitos = [];
  movimentosFeitos.push(pos);

  let Pos = converteEntrada(pos);
  if (Pos == false) {
    return false;
  }

  if (movimentacao(Pos[1], Pos[0], 1, tabuleiro)) {
    tabuleiro.reverse();
    animacao(movimentosFeitos);
    return (imprimeTabuleiro(tabuleiro))
  } else {
    tabuleiro.reverse();
    animacao(movimentosFeitos);
    console.log('Solução não encontrada');
    return (imprimeTabuleiro(tabuleiro))
  }
}

// funções visuais
// função para limpar o tabuleiro
function limpaTabuleiro(){
  let x = document.querySelectorAll('img')
  let cavalo = document.querySelectorAll('p')
  x.forEach(element => {
    element.style.display = 'none';
  });
  cavalo.forEach(element => {
    element.style.display = 'none';
  });
}
//função que mostra o cavalo na sua posição atual e depois substitui por um x indicando que a casa
// já foi visitada
function mostraCavalo(pos) {
  let posicao = document.getElementById(pos).querySelector('img');
  posicao.style.display = 'block';
     setTimeout(()=> { 
       mostraX(pos)
     }, 300);
}
//função que esconde o cavalo 
function escondeCavalo(pos) {
  let posicao = document.getElementById(pos).querySelector('img');
  posicao.style.display = 'none';
}
//função que mostra o x 
function mostraX(pos) {
  let x = document.getElementById(pos).querySelector('p');
  x.style.display = 'block';
  escondeCavalo(pos);
}
//função que esconde o x 
function escondeX(pos) {
  let x = document.getElementById(pos).querySelector('p');
  x.style.display = 'none';
}
//função para fazer a animação para aparecer um cavalo por vez baseado nos movimentos armazenados
function animacao(movimentos) {
  let tam = movimentosFeitos.length
  for (let i = 0; i < tam; i++) {
    
    setTimeout(()=> { 
      mostraCavalo(movimentos[i]) 
    }, i*300);
    
}


}

console.log('Chame a função "PasseioDoCavalo" e passe a posição inical. \nExemplo:"PasseioDoCavalo("a8")"');