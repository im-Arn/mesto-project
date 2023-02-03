import '../pages/index.css';

import {
  formElementProf,
  formElementCard,
  openPopup,
  closePopup,
} from './modal.js';

import {
  addBaseCard,
  addNewCard,
} from './card.js';

import Api from './api.js';
import FormValidator from './validate.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

import {
  server,
  settings,
  formProfile,
  formAvatar,
  formCards,
  popupImage,
  popupProfile,
} from './constants.js';

export const api = new Api(server);
const formProfileValidator = new FormValidator(settings, formProfile);
formProfileValidator.enableValidation();
const formAvatarValidator = new FormValidator(settings, formAvatar);
formAvatarValidator.enableValidation();
const formCardsValidator = new FormValidator(settings, formCards);
formCardsValidator.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const profilePopup = new PopupWithForm(
  {popup: popupProfile,
  callback: (formData) => {
    renderLoading(true, profileButtonSubmitter);
    api.changeProfile(formData)
  .then(profile => {
    profileName.textContent = profile.name;
    profileBio.textContent = profile.about;
    profilePopup.close();
  })
  .catch(err => {
    console.log(`Ошибка обновления информации профиля ${err}`);
  })
  .finally(() => {
    renderLoading(false, profileButtonSubmitter);
  })
  }
} )

profilePopup.setEventListeners();

const avatar = document.querySelector('.profile__avatar'); //изображение аватара
const popupAvatar = document.querySelector('.popup_avatar'); //попап смены аватара
const formElementAvatar = document.forms["popup-edit-avatar"]; //форма попапа аватара
const avatarImgInput = document.querySelector('.popup__item_el_avatar'); //поле ссылки попапа смены аватара
const avatarArea = document.querySelector('.profile__avatar-area'); //контейнер аватара и кнопки попапа
const avatarButton = document.querySelector('.profile__avatar-button'); //кнопка редактирования аватара
const avatarOverlay = document.querySelector('.profile__avatar-area-overlay'); //оверлей аватара при наведении на зону аватара

const profileButtonSubmitter = document.querySelector('.popup__button-submit'); //кнопка сабмит профиля
const profileButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const profileName = document.querySelector('.profile__name'); //имя профиля
const profileBio = document.querySelector('.profile__bio'); //био профиля
const profileNameInput = document.querySelector('.popup__item_el_name'); //поле имени профиля
const profileBioInput = document.querySelector('.popup__item_el_bio'); //поле био профиля

const сardsAddButton = document.querySelector('.profile__add-button'); //кнопка создания карточки
const popupCards = document.querySelector('.popup_cards'); //попап создания карточки
const cardsImgInput = document.querySelector('.popup__item_el_img'); //поле имени карточки
const cardsTitleInput = document.querySelector('.popup__item_el_title'); //поле url карточки

// Сброс состояния сабмита поп-апов ----------------------------------------------------------------------------------
const resetButtonState = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add('popup__button-submit_inactive');
};

const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    if (button === сardsAddButton) {
      button.textContent = 'Создать';
    } else {
      button.textContent = 'Сохранить';
    }
  }
};

// Обработчики событий открытия поп-апов -----------------------------------------------------------------------------
profileButton.addEventListener('click', () => {
  openPopup(popupProfile);
  profileNameInput.value = profileName.textContent;
  profileBioInput.value = profileBio.textContent;
});

сardsAddButton.addEventListener('click', () => {
  openPopup(popupCards);
});

avatarButton.addEventListener('click', () => {
  openPopup(popupAvatar);
});

// Обработчики событий наведения курсора на аватар -------------------------------------------------------------------
avatarArea.addEventListener('mouseover', () => {
  avatarOverlay.classList.add('profile__avatar-area-overlay_activ');
})

avatarArea.addEventListener('mouseout', () => {
  avatarOverlay.classList.remove('profile__avatar-area-overlay_activ');
})

// События отправки форм ---------------------------------------------------------------------------------------------
// formElementProf.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   profileName.textContent = profileNameInput.value;
//   profileBio.textContent = profileBioInput.value;
//   closePopup(popupProfile);
// });
// formElementCard.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   addCard(cardsImgInput.value, cardsTitleInput.value);
//   formElementCard.reset();
//   closePopup(popupCards);
//   resetButtonState(evt.submitter);
// });

// formElementProf.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   renderLoading(true, evt.submitter);
//   api.changeProfile(namePoup._getInputValues) /*profileNameInput.value, profileBioInput.value*/
//   .then(profile => {
//     profileName.textContent = profile.name;
//     profileBio.textContent = profile.about;
//     closePopup(popupProfile);
//   })
//   .catch(err => {
//     console.log(`Ошибка обновления информации профиля ${err}`);
//   })
//   .finally(() => {
//     renderLoading(false, evt.submitter);
//   })
// });

formElementCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  api.postNewCard(cardsTitleInput.value, cardsImgInput.value)
    .then((card) => {
      formElementCard.reset();
      addNewCard(card, card.owner);
      closePopup(popupCards);
      resetButtonState(evt.submitter);
    })
    .catch((err) => {
      console.log(`Ошибка создания карточки ${err}`);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    })
});

formElementAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  api.changeAvatar(avatarImgInput.value)
    .then(() =>{
      avatar.src = avatarImgInput.value;
      formElementAvatar.reset();
      closePopup(popupAvatar);
      resetButtonState(evt.submitter);
    })
    .catch((err) => {
      console.log(`Ошибка обновления аватара ${err}`);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    })
});

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__item',
//   submitButtonSelector: '.popup__button-submit',
//   inactiveButtonClass: 'popup__button-submit_inactive',
//   inputErrorClass: 'popup__item_type_error',
//   errorClass: 'popup__input-error_active'
// });

Promise.all([api.getServerCards(), api.getServerProfile()])
  .then(([cards, profile]) => {
    const profileID = document.querySelector('.profile');
    profileID.id = profile._id;
    profileName.textContent = profile.name;
    profileBio.textContent = profile.about;
    avatar.src = profile.avatar;
    cards.forEach((card) => {
      addBaseCard(card, profile);
    });
  })
  .catch((data) => {
    console.log(`Ошибка соединения с сервером ${data}`);
  });
