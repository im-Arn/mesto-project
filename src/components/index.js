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
  cardsList,
  createCard,
} from './card.js';

import Api from './api.js';
import FormValidator from './validate.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js'
import Card from './newCard.js'

import {
  server,
  settings,
  formProfile,
  formAvatar,
  formCards,
  popupImage,
  popupProfile,
  popupAvatar,
  submitterProfileButton,
  submitterAvatarButton,
  submitterCardButton,
  popupCards,
  profileName,
  profileBio,
  avatar,
  cardTemplate,
} from './constants.js';


const userInfo = new UserInfo(profileName, profileBio, avatar);
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
  {
    popup: popupProfile,
    callback: (formData) => {
      renderLoading(true, submitterProfileButton);
      api.changeProfile(formData)
        .then(profile => {
          userInfo.setUserInfo(profile);
          profilePopup.close();
        })
        .catch(err => {
          console.log(`Ошибка обновления информации профиля ${err}`);
        })
        .finally(() => {
          renderLoading(false, submitterProfileButton);
        })
    }
  })

profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popup: popupAvatar,
  callback: (formData) => {
    renderLoading(true, submitterAvatarButton);
    api.changeAvatar(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        avatarPopup.close();
        resetButtonState(submitterAvatarButton);
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара ${err}`);
      })
      .finally(() => {
        renderLoading(false, submitterAvatarButton);
      })
  }
})

avatarPopup.setEventListeners();

const cardsPopup = new PopupWithForm({
  popup: popupCards,
  callback: (formData) => {
    renderLoading(true, submitterCardButton);
    api.postNewCard(formData)
      .then((card) => {
        const cardNew = generateCard(card).generate();
        cardsList.prepend(cardNew);
        cardsPopup.close()
        resetButtonState(submitterCardButton);
      })
      .catch((err) => {
        console.log(`Ошибка создания карточки ${err}`);
      })
      .finally(() => {
        renderLoading(false, submitterCardButton);
      })
  }
})

cardsPopup.setEventListeners();

const generateCard = (card) => {
  return new Card(card, userInfo.userId, cardTemplate, {
    handleCardClick: () => {
      popupWithImage.open(card.name, card.link);
    }
  }, cardActions)
}

const setSection = (cards) => {
  return new Section({
    cards: cards,
    renderer: (card) => {
      const cardNew = generateCard(card).generate();
      return cardNew;
    },
    cardsList
  })
}

const formElementAvatar = document.forms["popup-edit-avatar"]; //форма попапа аватара
const avatarImgInput = document.querySelector('.popup__item_el_avatar'); //поле ссылки попапа смены аватара
const avatarArea = document.querySelector('.profile__avatar-area'); //контейнер аватара и кнопки попапа
const avatarButton = document.querySelector('.profile__avatar-button'); //кнопка редактирования аватара
const avatarOverlay = document.querySelector('.profile__avatar-area-overlay'); //оверлей аватара при наведении на зону аватара


const profileButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля

const profileNameInput = document.querySelector('.popup__item_el_name'); //поле имени профиля
const profileBioInput = document.querySelector('.popup__item_el_bio'); //поле био профиля

const сardsAddButton = document.querySelector('.profile__add-button'); //кнопка создания карточки

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
  profilePopup.open();
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileBioInput.value = userData.about;
});

сardsAddButton.addEventListener('click', () => {
  cardsPopup.open();
});

avatarButton.addEventListener('click', () => {
  avatarPopup.open();
});

// Обработчики событий наведения курсора на аватар -------------------------------------------------------------------
avatarArea.addEventListener('mouseover', () => {
  avatarOverlay.classList.add('profile__avatar-area-overlay_activ');
})

avatarArea.addEventListener('mouseout', () => {
  avatarOverlay.classList.remove('profile__avatar-area-overlay_activ');
})


Promise.all([api.getServerCards(), api.getServerProfile()])
  .then(([cards, profile]) => {
    // const profileID = document.querySelector('.profile');
    userInfo.setUserInfo(profile);
    // profileID.id = userInfo.userId;
    // cards.forEach((card) => {
    //   const cardNew = generateCard(card).generate();
    //   cardsList.append(cardNew);
    // });
    const section = setSection(cards);
    const rendererSection = section.renderItems();
    section.addDefaultItem(rendererSection);
  })
  .catch((data) => {
    console.log(`Ошибка соединения с сервером ${data}`);
  });


const cardActions = {
  likeState: (card, likeCount, likeButton) => {
      if (likeButton.classList.contains('cards-grid__heart-button_active')) {
      api.uncheckHeart(card._id)
        .then((data) => {
            likeCount.textContent = data.likes.length;
            likeButton.classList.toggle('cards-grid__heart-button_active');
        })
        .catch((err) => {
          console.error(`Ошибка лайка карточки: ${err}`);
        });
    } else {
      api.checkHeart(card._id)
        .then((data) => {
            likeCount.textContent = data.likes.length;
            likeButton.classList.toggle('cards-grid__heart-button_active');
        })
        .catch((err) => {
          console.error(`Ошибка лайка карточки: ${err}`);
        });
    }
  },
  deleteCard: (card, e) => {
    api.deleteOwnCard(card._id)
    .then(() => {
      e.target.closest('.cards-grid__item').remove();
    })
    .catch(err => {
      console.log(`Ошибка удаления карточки: ${err}`);
    })
  }
};
