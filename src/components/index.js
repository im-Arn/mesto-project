import '../pages/index.css';

import {
  enableValidation,
} from './validate.js';

import {
  formElementProf,
  formElementCard,
  openPopup,
  closePopup,
} from './modal.js';

import {
  addCard,
 } from './card.js';

const profileButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const popupProfile = document.querySelector('.popup_profile'); //попап профиля
const profileName = document.querySelector('.profile__name'); //имя профиля
const profileBio = document.querySelector('.profile__bio'); //био профиля
const profileNameInput = document.querySelector('.popup__item_el_name'); //поле имени профиля
const profileBioInput = document.querySelector('.popup__item_el_bio'); //поле био профиля

const сardsAddButton = document.querySelector('.profile__add-button'); //кнопка создания карточки
const popupCards = document.querySelector('.popup_cards'); //попап создания карточки
const cardsImgInput = document.querySelector('.popup__item_el_img'); //поле имени карточки
const cardsTitleInput = document.querySelector('.popup__item_el_title'); //поле url карточки

const resetButtonState = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add('popup__button-submit_inactive');
};

// Обработчики событий открытия поп-апов -----------------------------------------------------------------------------
profileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  profileNameInput.value = profileName.textContent;
  profileBioInput.value = profileBio.textContent;
});

сardsAddButton.addEventListener('click', function () {
  openPopup(popupCards);
});

// События отправки форм --------------------------------------------------------------------------------------------
formElementProf.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  closePopup(popupProfile);
});

formElementCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(cardsImgInput.value, cardsTitleInput.value);
  formElementCard.reset();
  closePopup(popupCards);
  resetButtonState(evt.submitter);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
});
