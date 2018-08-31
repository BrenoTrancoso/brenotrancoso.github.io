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
}

function carregarTrilha() {  
  document.getElementById('letras').innerHTML = '_ '.repeat(palavra.length);
}

function carregarEventos() {
  document.getElementById('enviar').onclick = enviarTentativa;
}

function enviarTentativa() {
  
}

function normalizar(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
