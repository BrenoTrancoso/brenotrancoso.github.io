const palavras = ["Ruido", "Bilhete", "Mentira", "Trombeta", "Carro", "Cidade", "Palavra", "Carpa", "Taxidermia", "Popular",
                  "Turismo", "Ruim", "Página", "Amor", "Acesso", "Etiqueta", "Sugestão", "Hospital", "Almoço", "Brinde",
                  "Bermuda", "Madeira", "Razão", "Divisória", "Tijolo", "Salsicha", "Formigueiro", "Gotejamento", "Quadrúpede",
                  "Chão", "Famoso", "Acampamento", "Longe", "Recital", "Barcelona", "Superstição", "Prego", "Enfermeira", "Bateria", "Carta",
                  "Medalha", "Cereais", "Beijo", "Manutenção", "Mulher", "Homicídio", "Cardeal", "Postiço", "Frágil", "Céu", "Antena",
                  "Virgem", "Co-piloto", "Violação", "Bicicleta", "TV", "Revendedor", "Duro", "Deslumbramento", "Saraivada", "Captura",
                  "Resgate", "Lubrificante", "Enigma", "Lago", "Marrom", "Monumento", "Queijo", "Galeria", "Descobridor", "Amendoim",
                  "Zangado", "Igual", "Aliança", "Inesperado", "Plágio", "Pomba", "Ocupação", "Granada", "Universidade", "Açougueiro",
                  "Bigorna", "Esquilo", "Presente", "Doce", "Cola", "Livraria", "Lavatório", "Molde", "Fábrica", "Boato", "Ciclone",
                  "Computador", "Ato", "Grelha", "Membrana", "Verruga", "Camponês", "Pedal", "Facada", "Jogo", "Cintura", "Eixo"];

const palavra = palavras[Math.floor(Math.random() * 100)];
const palavraAcertada = new Array(palavra.length);

let letrasTentadas = [];

window.onload = () => {
  carregarTrilha();
  carregarEventos();
  relevarChanceRestante();
  revelarLetrasJaJogadas();
}

function carregarTrilha() {  
  document.getElementById('letras').innerHTML = '_ '.repeat(palavra.length);
}

function carregarEventos() {
  document.getElementById('enviar').onclick = enviarTentativa;
}

function enviarTentativa() {
  let letraDigitada = document.getElementById('inputLetra').value;
  
  if (letraDigitada === '') {
    alert('Nenhuma letra informada.');
    return;
  } 
  
  let chrDigitado = letraDigitada.charAt(0).toUpperCase();
  
  if (isPalavraComLetra(chrDigitado)) {
    let indices = getPosicoesComLetra(chrDigitado);
    popularLetras(indices);
    revelarLetras();
  } else {
    letrasTentadas.push(chrDigitado);    
  }
  
  relevarChanceRestante();
  revelarLetrasJaJogadas();
  document.getElementById('inputLetra').value = '';
  
  if (letrasTentadas.length === 5) {
    revelarPalavra();
  }
}

function revelarPalavra() {
  palavraAcertada.fill('');
  revelarLetras();
  document.getElementById('enviar').disabled = true;
}

function popularLetras(indices) {
  indices.forEach((e, i) => palavraAcertada[e] = palavra.charAt(e));
}

function isPalavraComLetra(chr) {
  return normalizar(palavra).toUpperCase().indexOf(chr) >= 0;
}

function getPosicoesComLetra(chr) {
  let posicoes = [];
  let palavraNorm = normalizar(palavra).toUpperCase();
  let chrNorm = normalizar(chr).toUpperCase();
  
  for (let i = 0; i < palavraNorm.length; i++) {
    if (palavraNorm.charAt(i) === chrNorm) {
      posicoes.push(i);
    }
  }
  
  return posicoes;
}

function normalizar(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function revelarLetras() {  
  var str = "";
  
  for (let i = 0; i < palavra.length; i++) { 
    if (palavraAcertada[i] == null) {      
      str += '_';      
    } else {
      str += palavra[i];
    }
    
    str += ' ';
  }  
  
  document.getElementById('letras').innerHTML = str;
}

function relevarChanceRestante() {
  document.getElementById('tentativasRestantes').innerHTML = 'Tentativas restante: ' + (5 - letrasTentadas.length);
}

function revelarLetrasJaJogadas() {
  document.getElementById('letrasJogadas').innerHTML = 'Letras: ' + letrasTentadas;
}
