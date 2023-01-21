const server = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18/',
  headers: {
    authorization: '5eae8a5e-c994-4c27-8d42-aedac4e6ee20',
    'Content-Type': 'application/json'
  },
  post: 'POST', //для отправки данных на сервер
  patch: 'PATCH', //для профиля пользователя
  put: 'PUT', //предназначен для полного обновления указанного ресурса
  delete: 'DELETE'//для удаления ресурса с сервера
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

// Взаимодействие с карточками -----------------------------------------------
const getServerCards = () => {
  return fetch(`${server.baseUrl}cards`, {
    headers: server.headers
  })
    .then((res) => getResponse(res))
};

const postNewCard = (name, link) => {
  return fetch(`${server.baseUrl}cards`, {
    method: server.post,
    headers: server.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then((res) => getResponse(res))
};

const deleteOwnCard = (cardID) => {
  return fetch(`${server.baseUrl}cards/${cardID}`, {
    method: server.delete,
    headers: server.headers
  })
    .then((res) => getResponse(res))
};

// Взаимодействие с профилем -----------------------------------------------
const getServerProfile = () => {
  return fetch(`${server.baseUrl}users/me`, {
    headers: server.headers
  })
    .then((res) => getResponse(res))
};

const changeProfile = (name, about) => {
  return fetch(`${server.baseUrl}users/me`, {
    method: server.patch,
    headers: server.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then((res) => getResponse(res))
};

// Взаимодействие с аватаром ----------------------------------------------
const changeAvatar = (avatar) => {
  return fetch(`${server.baseUrl}users/me/avatar`, {
    method: server.patch,
    headers: server.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
};

// Взаимодействие с лайками -----------------------------------------------
const checkHeart = (cardID) => {
  return fetch(`${server.baseUrl}cards/likes/${cardID}`, {
    method: server.put,
    headers: server.headers
  })
    .then((res) => getResponse(res))
};

const uncheckHeart = (cardID) => {
  return fetch(`${server.baseUrl}cards/likes/${cardID}`, {
    method: server.delete,
    headers: server.headers
  })
    .then((res) => getResponse(res))
};


export {
  getServerCards,
  getServerProfile,
  postNewCard,
  changeProfile,
  deleteOwnCard,
  checkHeart,
  uncheckHeart,
  changeAvatar,
};
