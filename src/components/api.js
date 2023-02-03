

class Api {
  constructor(server) {
    this._server = server;
  }


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
   * Публичный метод получения карточек
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

  deleteOwnCard(cardID) {
    return fetch(`${this._server.baseUrl}cards/${cardID}`, {
      method: this._server.delete,
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };

  // Взаимодействие с профилем -----------------------------------------------
  getServerProfile() {
    return fetch(`${this._server.baseUrl}users/me`, {
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };

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
  checkHeart(cardID) {
    return fetch(`${this._server.baseUrl}cards/likes/${cardID}`, {
      method: this._server.put,
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };

  uncheckHeart(cardID) {
    return fetch(`${this._server.baseUrl}cards/likes/${cardID}`, {
      method: this._server.delete,
      headers: this._server.headers
    })
      .then((res) => this._getResponse(res))
  };
}



export default Api;
