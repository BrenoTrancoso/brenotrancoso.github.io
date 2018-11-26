let worker = new Worker("worker.js");

onload = () => {
    document.getElementById('btnEnviar').onclick = iniciar;
}

function iniciar() {
    worker.onmessage = e => atualizarProgresso(e.data);
    worker.postMessage(document.getElementById('inputTamanho').value);    
}

function atualizarProgresso(porcentagem) {
    document.getElementById('porcentagem').innerHTML = Math.floor(porcentagem) + '%';
}