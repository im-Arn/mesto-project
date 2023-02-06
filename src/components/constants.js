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
export const popupProfile = document.querySelector('.popup_profile');
export const popupAvatar = document.querySelector('.popup_avatar'); //попап смены аватара
export const submitterProfileButton = document.querySelector('#subPopupProfile'); //кнопка сабмит профиля
export const submitterAvatarButton = document.querySelector('#subPopupAvatar'); //кнопка сабмит аватар
export const submitterCardButton = document.querySelector('#subPopupCards'); //кнопка сабмит карточки
export const popupCards = document.querySelector('.popup_cards'); //попап создания карточки
export const profileName = document.querySelector('.profile__name'); //имя профиля
export const profileBio = document.querySelector('.profile__bio'); //био профиля
export const avatar = document.querySelector('.profile__avatar'); //изображение аватара
export const cardTemplate = document.querySelector('.template-cards').content;
export const cardsList = document.querySelector('.cards-grid__list'); //список карточек
