import '../pages/index.css';

import {
  enableValidation,
} from './validate.js';

import {
  formElementProf,
  formElementCard,
  сardsAddButton,
  openPopup,
  closePopup,
  profileButton,
  popupProfile,
  profileName,
  profileBio,
  profileNameInput,
  profileBioInput,
  popupCards,
  cardsImgInput,
  cardsTitleInput,
} from './modal.js';

import {
  addCard,
 } from './card.js';

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
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
});
