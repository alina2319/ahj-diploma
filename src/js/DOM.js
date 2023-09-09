import formatData from './Utility/FormatData';

export default class DOM {
  static createMessageContainer(bodyElement, geo, date) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chaos_messages_message');
    messageElement.innerHTML = `
      <div class="chaos_message_header">
        <div class="chaos_message_date">
          ${formatData(date)}
        </div>
        <div class="chaos_message_tools chaos_message_tools_show"></div>
      </div>
      <div class="chaos_message_body">
        ${bodyElement}
      </div>`;

    if (geo) {
      messageElement.innerHTML += `
        <div class="chaos_message_geo">
          <div class="chaos_geo_icon"></div>
          <a href="https://yandex.ru/maps/?text=${geo}" target="_blank">[${geo}]</a>
        </div>`;
    }

    return messageElement;
  }

  static createMessageElement(text, geo, date) {
    const textElement = `<p>${this.linkify(text)}</p>`;
    return DOM.createMessageContainer(textElement, geo, date);
  }

  static createImageElement(url, fileName, geo, date) {
    const imageElement = `<img class="chaos_messages_image" src="${url}/${fileName}">`;
    return DOM.createMessageContainer(imageElement, geo, date);
  }

  static createVideoElement(url, fileName, geo, date) {
    const videoElement = `<video class="chaos_messages_video" src="${url}/${fileName}" controls></video>`;
    return DOM.createMessageContainer(videoElement, geo, date);
  }

  static createAudioElement(url, fileName, geo, date) {
    const audioElement = `<audio class="chaos_messages_audio" src="${url}/${fileName}" controls></audio>`;
    return DOM.createMessageContainer(audioElement, geo, date);
  }

  static createFileElement(url, fileName, geo, date) {
    const fileElement = `
      <div class="chaos_messages_file">
        <a href="${url}/${fileName}">
          <div class="chaos_messages_file_bg"></div>
        </a>
        <a href="${url}/${fileName}">${fileName}</a>
      </div>`;
    return DOM.createMessageContainer(fileElement, geo, date);
  }

  static createToolsElements() {
    const toolsElements = document.createElement('div');
    toolsElements.classList.add('chaos_message_tools_container');
    toolsElements.innerHTML = `
        <div class="chaos_message_tools_delete"></div>
        <div class="chaos_message_tools_pin"></div>
        <div class="chaos_message_tools_favourite"></div>
      `;
    return toolsElements;
  }

  static getFavouriteMark() {
    const favouriteElement = document.createElement('div');
    favouriteElement.classList.add('chaos_message_favourite');
    return favouriteElement;
  }

  static getPinMark() {
    const pinMarkElement = document.createElement('div');
    pinMarkElement.classList.add('chaos_message_pin');
    return pinMarkElement;
  }

  static getPinnedMessage(element) {
    const pinnedElement = document.createElement('div');
    pinnedElement.classList.add('chaos_pinned');
    pinnedElement.innerHTML = `
        <div class="chaos_pinned_container">
          ${element.innerHTML}
        </div>
        <div class="chaos_pinned_side">
          <div class="chaos_pinned_title">Закреплённое сообщение <div class="chaos_pinned_close"></div></div>
          <div class="chaos_pinned_select"></div>
        </div>
      `;
    return pinnedElement;
  }

  static createSelectContainer(date) {
    const selectContainerElement = document.createElement('div');
    selectContainerElement.classList.add('chaos_messages', 'chaos_select_container');
    selectContainerElement.innerHTML = `
    <div class="chaos_select_header">
      Сообщение от ${formatData(date, true)}
      <div class="chaos_select_close"></div>
    </div>`;
    return selectContainerElement;
  }

  static createErrorConnectionElement() {
    const connectionErrorElement = document.createElement('div');
    connectionErrorElement.classList.add('chaos_connection_error');
    return connectionErrorElement;
  }

  static createSideElement(className, text, count) {
    const sideElement = document.createElement('li');
    sideElement.classList.add('chaos_side_item', className);
    sideElement.innerHTML = `${text}: <span>${count}</span>`;
    return sideElement;
  }

  static createSideSubheadElement(text) {
    const subheadElement = document.createElement('div');
    subheadElement.classList.add('chaos_side_subhead');
    subheadElement.innerHTML = `<h3>${text}</h3><div class="chaos_side_close"></div>`;
    return subheadElement;
  }

  static createSideCategoryList() {
    const categoryListElement = document.createElement('ul');
    categoryListElement.classList.add('chaos_side_list');
    return categoryListElement;
  }

  static createSideElementContainer(bodyElement) {
    const listElement = document.createElement('li');
    listElement.classList.add('chaos_side_item', 'chaos_side_open_item');
    listElement.innerHTML = `
      <div class="chaos_side_open_container">
        <div class="chaos_side_open_select"></div>
        <div class="chaos_side_open_element">
          ${bodyElement}
        </div>
      </div>
    `;
    return listElement;
  }

  static createSideLinkElement(link) {
    const bodyElement = `<p><a href="${link}">${link}</a></p>`;
    const listElement = DOM.createSideElementContainer(bodyElement);
    return listElement;
  }

  static createSideImageElement(fileName, url) {
    const bodyElement = `<img class="chaos_messages_image" src="${url}/${fileName}">`;
    const listElement = DOM.createSideElementContainer(bodyElement);
    return listElement;
  }

  static createSideVideoElement(fileName, url) {
    const bodyElement = `<video class="chaos_messages_video" src="${url}/${fileName}" controls></video>`;
    const listElement = DOM.createSideElementContainer(bodyElement);
    return listElement;
  }

  static createSideAudioElement(fileName, url) {
    const bodyElement = `<audio class="chaos_messages_audio" src="${url}/${fileName}" controls></audio>`;
    const listElement = DOM.createSideElementContainer(bodyElement);
    return listElement;
  }

  static createSideFileElement(fileName, url) {
    const bodyElement = `
    <a href="${url}/${fileName}">
      <div class="chaos_messages_file_bg"></div>
    </a>
    <a href="${url}/${fileName}">${fileName}</a>`;
    const listElement = DOM.createSideElementContainer(bodyElement);
    return listElement;
  }

  static createFavouritesDescription(count, dateFrom, dateTo) {
    const listElement = document.createElement('li');
    listElement.classList.add('chaos_side_item', 'chaos_side_open_item');

    listElement.innerHTML = `
      <div class="chaos_side_open_container">
        <div class="chaos_side_open_element">
          <p class="chaos_side_favourites_description">Всего сообщений: <b>${count}</b><br>
          С <b>${formatData(dateFrom, true)}</b><br>
          По <b>${formatData(dateTo, true)}</b></p>
        </div>
      </div>
    `;
    return listElement;
  }

  static getAddForm() {
    const addFormElement = document.createElement('label');
    addFormElement.classList.add('chaos_file_label');
    addFormElement.innerHTML = `
      <div class="chaos_file_input">Добавить файл</div>
      <input type="file" class="chaos_file_hidden">`;
    return addFormElement;
  }

  static getMediaForm(type) {
    const mediaContainerElement = document.createElement('div');
    mediaContainerElement.classList.add('chaos_media_container');
    mediaContainerElement.innerHTML = `
      <div class="chaos_media_record"></div>
      <div class="chaos_media_status">
        Ожидание ${type}
      </div>
      <div class="chaos_media_stop"></div>`;
    return mediaContainerElement;
  }

  static createGeoElement(value) {
    const geoElement = document.createElement('div');
    geoElement.classList.add('chaos_geo');
    geoElement.innerHTML = `
      <div class="chaos_geo_icon"></div>
      [${value}]
      <div class="chaos_geo_close"></div>
      `;
    return geoElement;
  }

  static errorMediaForm() {
    const mediaContainerElement = document.createElement('div');
    mediaContainerElement.classList.add('chaos_media_container');
    mediaContainerElement.innerHTML = `
      <div class="chaos_media_status">
        Ваш браузер не поддерживает запись медиа
      </div>`;
    return mediaContainerElement;
  }

  static getCloseForm() {
    const closeElement = document.createElement('div');
    closeElement.classList.add('chaos_form_close');
    return closeElement;
  }

  static createDropPlace() {
    const dropplaceContainerElement = document.createElement('div');
    dropplaceContainerElement.classList.add('chaos_dropplace_container');
    dropplaceContainerElement.innerHTML = '<div class="chaos_dropplace"></div>';
    return dropplaceContainerElement;
  }

  static linkify(text) {
    const textWithLinks = text.replace(/((http:\/\/|https:\/\/){1}(www)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-?%#&-]*)*\/?)/gi, '<a href="$1">$1</a>');
    return textWithLinks;
  }
}
