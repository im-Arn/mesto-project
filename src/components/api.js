
class Api {
  constructor(server) {
    this._server = server;
  }

  /**
   * Приватный метод проверки ответа сервера
   */
  _getResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  // Взаимодействие с карточками -----------------------------------------------
  /**
   * Публичный метод взаимодействия с карточками
   */
  getServerCards() {
    return fetch(`${this._server.baseUrl}cards`, {
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };

  /**
   * Публичный метод создания карточки
   */
  postNewCard(data) {
    return fetch(`${this._server.baseUrl}cards`, {
      method: this._server.post,
      headers: this._server.headers,
      body: JSON.stringify({
        name: data[Object.keys(data)[0]],
        link: data[Object.keys(data)[1]]
      })
    })
      .then((res) => this._getResponse(res))
  };

  /**
   * Публичный метод удаления карточки
   */
  deleteOwnCard(cardID) {
    return fetch(`${this._server.baseUrl}cards/${cardID}`, {
      method: this._server.delete,
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };

  // Взаимодействие с профилем -----------------------------------------------
  /**
   * Публичный метод получения данных профиля
   */
  getServerProfile() {
    return fetch(`${this._server.baseUrl}users/me`, {
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };

  /**
   * Публичный метод изменения данных профиля
   */
  changeProfile(data) {
    return fetch(`${this._server.baseUrl}users/me`, {
      method: this._server.patch,
      headers: this._server.headers,
      body: JSON.stringify({
        name: data[Object.keys(data)[0]],
        about: data[Object.keys(data)[1]]
      })
    })
      .then((res) => this._getResponse(res))
  };

  // Взаимодействие с аватаром ----------------------------------------------
  /**
   * Публичный метод изменения данных аватара
   */
  changeAvatar(data) {
    return fetch(`${this._server.baseUrl}users/me/avatar`, {
      method: this._server.patch,
      headers: this._server.headers,
      body: JSON.stringify({
        avatar: data[Object.keys(data)[0]]
      })
    })
      .then((res) => this._getResponse(res))
  };

  // Взаимодействие с лайками -----------------------------------------------
  /**
  * Публичный метод постановки лайка
  */
  checkHeart(cardID) {
    return fetch(`${this._server.baseUrl}cards/likes/${cardID}`, {
      method: this._server.put,
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };

  /**
   * Публичный метод снятия лайка
   */
  uncheckHeart(cardID) {
    return fetch(`${this._server.baseUrl}cards/likes/${cardID}`, {
      method: this._server.delete,
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };
}

export default Api;
