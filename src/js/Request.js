export default class Request {
  constructor(links) {
    this.server = links.root;
    this.wsServer = links.ws;

    this.data = { event: 'load' };
    this.callbacks = {
      error: () => { throw Error('Ошибка соединения с сервером'); },
    };

    this.onOpen = this.onOpen.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  init() {
    this.ws = new WebSocket(this.wsServer);

    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('message', this.onMessage);
    this.ws.addEventListener('error', this.callbacks.error);
    this.ws.addEventListener('close', this.callbacks.error);
  }

  onOpen() {
    this.ws.send(JSON.stringify(this.data));
  }

  onMessage(event) {
    const data = JSON.parse(event.data);

    if (data.event === 'database') {
      this.callbacks.load(data.dB, data.favourites, data.position);
      if (data.pinnedMessage) {
        this.callbacks.pinMessage(data.pinnedMessage.type, data.pinnedMessage.id,
          data.pinnedMessage.message, data.pinnedMessage.geo, data.pinnedMessage.date);
      }
      this.callbacks.sideLoad(data.side);
    }

    if (data.event === 'text') {
      this.callbacks.message(data.id, data.message, data.geo, data.date);
      this.callbacks.sideLoad(data.side);
    }

    if (data.event === 'file') {
      this.callbacks.file(data.type, data.id, data.message, data.geo, data.date);
      this.callbacks.sideLoad(data.side);
    }

    if (data.event === 'storage') {
      this.callbacks.sideCategory(data);
    }

    if (data.event === 'select') {
      this.callbacks.showMessage(data.message);
    }

    if (data.event === 'delete') {
      this.callbacks.delete(data.id);
      this.callbacks.sideLoad(data.side);
    }

    if (data.event === 'favourite') {
      this.callbacks.favourite(data.id);
      this.callbacks.sideLoad(data.side);
    }

    if (data.event === 'favouriteRemove') {
      this.callbacks.favouriteRemove(data.id);
      this.callbacks.sideLoad(data.side);
    }

    if (data.event === 'favouritesLoad') {
      this.callbacks.load(data.dB, data.favourites, 0);
      if (data.pinnedMessage) {
        this.callbacks.pinMessage(data.pinnedMessage.type, data.pinnedMessage.id,
          data.pinnedMessage.message, data.pinnedMessage.geo, data.pinnedMessage.date);
      }
      this.callbacks.sideFavourites(data.dB);
    }

    if (data.event === 'pin') {
      this.callbacks.pin(data.pinnedMessage.id);
      this.callbacks.pinMessage(data.pinnedMessage.type, data.pinnedMessage.id,
        data.pinnedMessage.message, data.pinnedMessage.geo, data.pinnedMessage.date);
    }

    if (data.event === 'unpin') {
      this.callbacks.unpin(data.id);
    }
  }

  send(event, message) {
    if (this.ws.readyState === 1) {
      this.data = { event, message };
      this.ws.send(JSON.stringify(this.data));
    } else {
      this.callbacks.error();
    }
  }

  sendFile(formData) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${this.server}/upload`);
    xhr.addEventListener('error', () => this.callbacks.error());
    xhr.send(formData);
  }
}
