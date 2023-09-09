const url = new URL(window.location.href);

let WebSocketProtocol = 'wss';

if (url.hostname === 'localhost') {
  url.port = '7070';
  WebSocketProtocol = 'ws';
}

if (url.hostname === 'igor-chazov.github.io') {
  url.hostname = 'ahj-diplom-backend1.herokuapp.com';
  url.protocol = 'https';
}

const wsURL = new URL(url.href);
wsURL.protocol = WebSocketProtocol;

const root = url;
root.pathname = '';

const links = {
  root: root.origin,
  ws: new URL('ws', wsURL.href).href,
};

export default links;
