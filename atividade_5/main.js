const ESQUERDA = 37;
const CIMA = 38;
const DIREITA = 39;
const BAIXO = 40;

const TAMANHO_BLOCO = 25;
const QUANTIDADE_BLOCOS = 20;
const TAMANHO_INICIAL_COBRA = 4;

let cabecaCobraX = 0;
let cabecaCobraY = 0;
let maca = {x: 10, y: 10};
let pontuacao = 0;
let direcao;
let corpoCobra = [];
let ultimaPontuacao = 0;
let ctx;
let canvas;

onload = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.onkeydown = controleSetas;

    reiniciarJogo();
    gerarMaca();
    setInterval(jogo, 100);
}

function jogo() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    desenharCobra();

    cabecaCobraX = corpoCobra[0].x;
    cabecaCobraY = corpoCobra[0].y;

    verificarDirecao();

    if (cabecaCobraX == maca.x && cabecaCobraY == maca.x) {
        pontuacao++;
        gerarMaca();
    } else {
        corpoCobra.pop();
    }

    atualizarPontuacao();
    corpoCobra.unshift({x: cabecaCobraX, y: cabecaCobraY});

    ctx.fillStyle = "red";
    ctx.fillRect(maca.x * TAMANHO_BLOCO, maca.x * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);

    verificarSePerdeu();
}

function desenharCobra() {
    corpoCobra.forEach(corpo => {
        ctx.fillStyle = "white";
        ctx.fillRect(corpo.x * TAMANHO_BLOCO, corpo.y * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);

        ctx.strokeStyle = "black";
        ctx.strokeRect(corpo.x * TAMANHO_BLOCO, corpo.y * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);
    });
}

function gerarMaca() {
    maca.x = Math.floor(Math.random() * QUANTIDADE_BLOCOS);
    maca.x = Math.floor(Math.random() * QUANTIDADE_BLOCOS);

    if (corpoCobra.some(corpo => maca.x == corpo.x && maca.x == corpo.y)) {        
        gerarMaca();
    }
}

function reiniciarJogo() {
    corpoCobra = [];
    cabecaCobraX = 0;
    cabecaCobraY = 0;
    pontuacao = 0;

    if (direcao != 0) {
        gerarMaca();
    }

    direcao = 0;
    atualizarPontuacao();
    document.getElementById("ultimaPontuacao").innerHTML = ultimaPontuacao;

    [...Array(TAMANHO_INICIAL_COBRA).keys()].forEach(i => corpoCobra.unshift({x: i, y: 0}));
}

function controleSetas(event) {
    if (event.keyCode == CIMA && direcao != BAIXO) {
        direcao = CIMA;
    } else if (event.keyCode == BAIXO && direcao != CIMA) {
        direcao = BAIXO;
    } else if (event.keyCode == ESQUERDA && direcao != DIREITA) {
        direcao = ESQUERDA;
    } else if (event.keyCode == DIREITA && direcao != ESQUERDA) {
        direcao = DIREITA;
    }
}

function verificarDirecao() {
    switch (direcao) {
        case CIMA: cabecaCobraY--; break;
        case BAIXO: cabecaCobraY++; break;
        case ESQUERDA: cabecaCobraX--; break;
        case DIREITA: cabecaCobraX++; break;
    }
}

function verificarSePerdeu() {
    if ((cabecaCobraX == -1 || cabecaCobraX > QUANTIDADE_BLOCOS - 1 || 
        cabecaCobraY == -1 || cabecaCobraY > QUANTIDADE_BLOCOS - 1) || 
        (corpoCobra.some((value, index) => index > 0 && cabecaCobraX == value.x && cabecaCobraY == value.y))) {
        ultimaPontuacao = Math.max(ultimaPontuacao, pontuacao);
        reiniciarJogo();
    }
}

function atualizarPontuacao() {
    ctx.font = "15px arial";
    ctx.fillStyle = "white";
    ctx.fillText("Pontos: " + pontuacao, 10, 490);
}