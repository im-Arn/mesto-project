export const server = {
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

export const settings = {
  // formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
}

export const formProfile = document.querySelector('.popup__form-profile');
export const formAvatar = document.querySelector('.popup__form-avatar');
export const formCards = document.querySelector('.popup__form-cards');

export const popupImage = document.querySelector('.popup_image');