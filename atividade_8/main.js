onload = () => {
    document.getElementById('btnSalvar').onclick = salvar;

    if (isDadoSalvo()) {
        restaurar();
    }
}

function isDadoSalvo() {
    return localStorage.getItem('data') != null;
}

function salvar() {
    let obj = {};

    obj['nome'] = document.getElementById('inputNome').value;
    obj['texto'] = document.getElementById('textAreaTexto').value;
    obj['ultimo_acesso'] = new Date();

    localStorage.setItem('data', JSON.stringify(obj));
}

function restaurar() {
    let obj  = JSON.parse(localStorage.getItem('data'));

    document.getElementById('inputNome').value = obj['nome'];
    document.getElementById('textAreaTexto').value = obj['texto'];
    document.getElementById('aviso').innerHTML = "Último Acesso: " + new Date(obj['ultimo_acesso']).toLocaleString();
}