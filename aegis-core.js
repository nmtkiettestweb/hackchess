/* AEGIS CORE v1.0 - DEPTH 24 ENABLED */
var stockfish = new Worker('https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js');
var aiColor = 'b';

window.addEventListener("message", function(e) {
    if (e.data.type === "SET_SIDE") {
        aiColor = e.data.color === 'white' ? 'black' : 'white';
        if (aiColor === 'white') askAegis("start");
    }
});

function askAegis(fen) {
    stockfish.postMessage('position ' + (fen === "start" ? "startpos" : "fen " + fen));
    stockfish.postMessage('go depth 24');
}

stockfish.onmessage = function(event) {
    if (event.data.indexOf('bestmove') > -1) {
        var move = event.data.split(' ')[1];
        window.postMessage({ type: "AEGIS_MOVE", move: move }, "*");
    }
    if (event.data.indexOf('depth') > -1) {
        var d = event.data.match(/depth (\d+)/);
        if (d) window.postMessage({ type: "AEGIS_DEPTH", depth: d[1] }, "*");
    }
};
