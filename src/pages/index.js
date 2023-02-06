import '../pages/index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';

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
  avatarArea,
  avatarButton,
  avatarOverlay,
  profileNameInput,
  profileBioInput,
  profileButton,
  сardsAddButton,
  cardTemplate,
  cardsList,
} from '../components/constants.js';

// Сброс состояния сабмита поп-апов ==================================================================================
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

// Новые экземпляры классов ==========================================================================================
// Сервер-------------------------------------------------------
const api = new Api(server);
const userInfo = new UserInfo(profileName, profileBio, avatar);

// Валидация----------------------------------------------------
const formProfileValidator = new FormValidator(settings, formProfile);
const formAvatarValidator = new FormValidator(settings, formAvatar);
const formCardsValidator = new FormValidator(settings, formCards);
formProfileValidator.enableValidation();
formAvatarValidator.enableValidation();
formCardsValidator.enableValidation();

// Попапы-------------------------------------------------------
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
          resetButtonState(submitterProfileButton);
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
        setSection().addItem(cardNew);
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

// Актуализация данных отрисовки--------------------------------
const generateCard = (card) => {
  return new Card(card, userInfo.userId, cardTemplate, {
    handleCardClick: () => {
      popupWithImage.open(card.name, card.link);
    }
  }, cardActions)
};

const setSection = (cards) => {
  return new Section({
    items: cards,
    renderer: (card) => {
      const cardNew = generateCard(card).generate();
      return cardNew;
    }
  },
  cardsList)
};

// Обработчики событий открытия поп-апов =============================================================================
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

// Обработчики событий наведения курсора на аватар ==================================================================
avatarArea.addEventListener('mouseover', () => {
  avatarOverlay.classList.add('profile__avatar-area-overlay_activ');
})

avatarArea.addEventListener('mouseout', () => {
  avatarOverlay.classList.remove('profile__avatar-area-overlay_activ');
})

// Инициализация промисов сервера ==================================================================================
Promise.all([api.getServerCards(), api.getServerProfile()])
  .then(([cards, profile]) => {
    userInfo.setUserInfo(profile);
    setSection(cards).renderItems();
  })
  .catch((data) => {
    console.log(`Ошибка соединения с сервером ${data}`);
  });


// Словарь ========================================================================================================
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
