let indiceVideo = 1;
let player;

onload = () => {
    player = document.getElementById("player");

    player.onended = proximo;

    document.getElementById("btnPlay").onclick = play;
    document.getElementById("btnProximo").onclick = proximo;
    document.getElementById("btnAnterior").onclick = anterior;
    document.getElementById("btnVoltar10s").onplay = voltar10;
    document.getElementById("btnAvancar10").onclick = avancar10;
    document.getElementById("btnTelaCheia").onclick = telaCheia;
    document.getElementById("btnLoop").onclick = loop;    
}

function loop() {
    player.loop = !player.loop;
}

function play() {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
}

function proximo() {
    player.src = getFonteProximoVideo();
    player.play();
}

function anterior() {
    player.src = getFonteAnteriorVideo();
    player.play();
}

function voltar10() {
    player.currentTime -= 10;
}

function avancar10() {
    player.currentTime += 10;
}

function telaCheia() {
    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
    } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
    }
}

function getFonteProximoVideo() {
    if (indiceVideo == 11) {
        indiceVideo = 1;
    }

    return getFonteVideo(indiceVideo++);    
}

function getFonteAnteriorVideo() {
    if (indiceVideo == 0) {
        indiceVideo = 10;
    }

    return getFonteVideo(indiceVideo--);    
}

function getFonteVideo(indice) {
    return "videos/" + indice.toString().padStart(2, '0') + ".webm";
}