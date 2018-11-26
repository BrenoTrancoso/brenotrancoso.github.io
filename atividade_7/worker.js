let array = [];

onmessage = e => {    
    gerarArray(e.data);
}

function gerarArray(quantidade) {  
    array = Array.from({length: quantidade}, getIntRandom);
    ordenar();
}

function getIntRandom() {
    return Math.floor(Math.random() * (10000 -1) + 1);
}

function ordenar() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if ((array[i] | 0) > (array[j] | 0)) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }   
        }
        
        self.postMessage(((i + 1) / array.length) * 100);
    }
}