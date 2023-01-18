const server = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-17/',
  headers: {
    authorization: '5eae8a5e-c994-4c27-8d42-aedac4e6ee20',
    'Content-Type': 'application/json'
  },
  post: 'POST', //для отправки данных на сервер
  patch: 'PATCH', //для профиля пользователя
  put: 'PUT', //предназначен для полного обновления указанного ресурса
  delete: 'DELETE'//для удаления ресурса с сервера
}

const getResponse(res) => {
  if(res.ok) {
    return res.json();
  } else {

  }
}
