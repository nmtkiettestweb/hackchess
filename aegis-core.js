/* AEGIS CORE ENGINE - ENCRYPTED VERSION */
const _0x5a12=['postMessage','onmessage','include','bestmove','depth','score','cp'];(function(_0x2d8f,_0x5a12){const _0x4b3c=function(_0x1b2e){while(--_0x1b2e){_0x2d8f['push'](_0x2d8f['shift']());}};_0x4b3c(++_0x5a12);}(_0x5a12,0x1b5));const _0x4b3c=function(_0x2d8f,_0x5a12){_0x2d8f=_0x2d8f-0x0;let _0x1b2e=_0x5a12[_0x2d8f];return _0x1b2e;};

var stockfish = new Worker('https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js');

function askAegis(_0x3e1d) {
    // Cấu hình sức mạnh tối thượng Depth 24
    stockfish['postMessage']('position fen ' + _0x3e1d);
    stockfish['postMessage']('go depth 24');
}

stockfish.onmessage = function(event) {
    var _0x12a3 = event.data;
    if (_0x12a3.indexOf('bestmove') > -1) {
        var _0x44f2 = _0x12a3.split(' ')[1];
        // Truyền ngược dữ liệu về giao diện chính
        window.postMessage({ type: "AEGIS_MOVE", move: _0x44f2 }, "*");
    } else if (_0x12a3.indexOf('depth') > -1) {
        var _0x22b1 = _0x12a3.match(/depth (\d+)/);
        if (_0x22b1) window.postMessage({ type: "AEGIS_DEPTH", depth: _0x22b1[1] }, "*");
    }
};
