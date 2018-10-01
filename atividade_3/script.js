const PEDRA = 1;
const PAPEL = 2;
const TESOURA = 3;

const JO = 1;
const KEN = 2;
const PO = 3;

var vitoriasJogador = 0;
var vitoriasComputador = 0;

let audioVitoria = new Audio("audio/win.mp3");
let audioEmpate = new Audio("audio/tied.mp3");
let audioDerrota = new Audio("audio/lose.mp3");

window.onload = () => {  
  document.getElementById("pedra").onclick = () => jogar(PEDRA);
  document.getElementById("papel").onclick = () => jogar(PAPEL);
  document.getElementById("tesoura").onclick = () => jogar(TESOURA);
  document.getElementById("reiniciar").onclick = reiniciarJogo;
  
  document.getElementById("jo").onclick = () => escolherPersonagem(JO);
  document.getElementById("ken").onclick = () => escolherPersonagem(KEN);
  document.getElementById("po").onclick = () => escolherPersonagem(PO);  
  
  reiniciarJogo();
};

function jogar(escolhaJogador) {  
  let escolhaComputador = escolherComputador();
  
  if (escolhaComputador == escolhaJogador) {
    setMensagem("Empate.");
    audioEmpate.play();
    return;
  }
  
  let situacao = escolhaJogador === PEDRA && escolhaComputador === TESOURA ||
                 escolhaJogador === PAPEL && escolhaComputador === PEDRA ||
                 escolhaJogador === TESOURA && escolhaComputador === PAPEL;
  
  if (situacao) {
    vitoria();
  } else {
    derrota();
  }
}

function vitoria() {
  setMensagem("Você ganhou.");
  vitoriasJogador++;
  atualizarResultado();
  audioVitoria.play();
}

function derrota() {
  setMensagem("You have been terminated.");
  vitoriasComputador++;
  atualizarResultado();
  audioDerrota.play();
}

function reiniciarJogo() {
  vitoriasComputador = 0;
  vitoriasJogador = 0;
  setMensagem("");
  atualizarResultado();
  document.getElementById("personagens").style.display = 'block';
  document.getElementById("jogo").style.display = 'none';
}

function escolherPersonagem(personagem) {
  console.log(personagem);
  document.getElementById("personagemJogador").src = getImagemFromPersonagem(personagem);
  document.getElementById("personagens").style.display = 'none';
  document.getElementById("jogo").style.display = 'block';
}

function getImagemFromPersonagem(personagem) {
  switch (personagem) {
    case JO: return "img/jo.png";
    case KEN: return "img/ken.png";
    case PO: return "img/po.png";
  }
}

function setMensagem(msg) {
  document.getElementById("mensagem").innerHTML = msg;
}

function escolherComputador() {
  return Math.floor(Math.random() * 3 + 1);
}

function atualizarResultado() {
  document.getElementById("vitoriasJogador").innerHTML = vitoriasJogador;
  document.getElementById("vitoriasComputador").innerHTML = vitoriasComputador;
}