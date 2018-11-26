let mymap;
let layerGroupPontos;
let layerGroupLinhas;

onload = () => {
    document.getElementById('btnGetAll').onclick = downloadMarkers;
    document.getElementById('btnCleanMap').onclick = cleanMap;

    mymap = L.map('mapid').setView([-20.3479, -40.2995], 13);
    layerGroupPontos = L.layerGroup().addTo(mymap);
    layerGroupLinhas = L.layerGroup().addTo(mymap);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYnJlbm90ZWl4ZWlyYXRyYW5jb3NvIiwiYSI6ImNqbG4wdGw1dzFlMDEzdWxkb2tid3F3NnAifQ.rIsg6Lj58ZqO_3fWYuy1-A'
    }).addTo(mymap);

    mymap.on('click', onClickOnMap);
}

function onClickOnMap(event) {
    addPoint(event.latlng);
}

function addPoint(latlng) {
    L.marker(latlng).addTo(layerGroupPontos);
    let pontos = layerGroupPontos.getLayers();

    if (pontos.length >= 2) {
        addLinha(pontos[pontos.length - 2].getLatLng(), pontos[pontos.length - 1].getLatLng());
    }
}

function addLinha(pontoA, pontoB) {
    let latlngs = [pontoA, pontoB];

    L.polyline(latlngs, {color: 'red'}).addTo(layerGroupLinhas);
}

function getAllMarkers() {
    let pontos = [];

    layerGroupPontos.eachLayer(e => {
        pontos.push([e.getLatLng().lat, e.getLatLng().lng]);
    });

    return {"PONTOS": pontos};
}

function downloadMarkers() {
    let pontos = getAllMarkers();
    let pontosJson = JSON.stringify(pontos, null, 4);
    download("pontos.json", pontosJson);
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function cleanMap() {
    layerGroupPontos.clearLayers();
    layerGroupLinhas.clearLayers();
}