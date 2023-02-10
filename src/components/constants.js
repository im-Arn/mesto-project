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
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
}
// Попапы-------------------------------------------------------------------------------------------
export const popupImage = document.querySelector('.popup_image'); //попап просмотра изображения
export const popupProfile = document.querySelector('.popup_profile'); //попап смены профиля
export const popupAvatar = document.querySelector('.popup_avatar'); //попап смены аватара
export const popupCards = document.querySelector('.popup_cards'); //попап создания карточки
// Сабмиты попапов----------------------------------------------------------------------------------
export const submitterProfileButton = document.querySelector('#subPopupProfile'); //кнопка сабмит профиля
export const submitterAvatarButton = document.querySelector('#subPopupAvatar'); //кнопка сабмит аватар
export const submitterCardButton = document.querySelector('#subPopupCards'); //кнопка сабмит карточки
// Формы попапов------------------------------------------------------------------------------------
export const formAvatar = document.querySelector('.popup__form-avatar'); //форма аватара
export const formCards = document.querySelector('.popup__form-cards'); //форма карточек
export const formProfile = document.querySelector('.popup__form-profile'); //форма профиля
// Формы инпуты------------------------------------------------------------------------------------
export const profileNameInput = document.querySelector('.popup__item_el_name'); //поле имени профиля
export const profileBioInput = document.querySelector('.popup__item_el_bio'); //поле био профиля
// Профиль------------------------------------------------------------------------------------------
export const profileName = document.querySelector('.profile__name'); //имя профиля
export const profileBio = document.querySelector('.profile__bio'); //био профиля
// Карточки-----------------------------------------------------------------------------------------
export const cardTemplate = document.querySelector('.template-cards').content;
export const cardsList = document.querySelector('.cards-grid__list'); //список карточек
// Аватар-------------------------------------------------------------------------------------------
export const avatar = document.querySelector('.profile__avatar'); //изображение аватара
export const avatarArea = document.querySelector('.profile__avatar-area'); //контейнер аватара и кнопки попапа
export const avatarOverlay = document.querySelector('.profile__avatar-area-overlay'); //оверлей аватара при наведении на зону аватара
// Кнопки-------------------------------------------------------------------------------------------
export const profileButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
export const сardsAddButton = document.querySelector('.profile__add-button'); //кнопка создания карточки
export const avatarButton = document.querySelector('.profile__avatar-button'); //кнопка редактирования аватара
