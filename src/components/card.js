import {
  openPopup,
} from './modal.js';

import {
  api
} from './index.js';

import {
  cardsList,
} from './constants.js';

const cardTemplate = document.querySelector('.template-cards').content; //темплейт карточки
const popupImageValue = document.querySelector('.popup__photo'); //темплейт карточки изображение
const popupTitleValue = document.querySelector('.popup__subtitle'); //темплейт карточки заголовок
//эта дуболь!
const popupImage = document.querySelector('.popup_image'); //попап изображения

class Section {
  constructor({data}, selector) {
    this._initialArray = data;
    this._container = document.querySelector(selector);
  }

  renderItems() {

  }

  setItemAppend(item) {

  }

  setItemPrepend(item) {

  }
}

// Вспомогательные функции -----------------------------------------------------------------------------------------------------------
function toggleLike(likes, likeCount, likeButtn) {
  likeCount.textContent = likes.likes.length;
  likeButtn.classList.toggle('cards-grid__heart-button_active');
}

function checkCardOwner(card, profile, trashButton) {
  if (profile._id === card.owner._id) {
    trashButton.classList.add('cards-grid__trash-button_active');
  }
}

//темплэйт для карточек ---------------------------------------------------------------------------------------------
function createCard(card, profile) {
  const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards-grid__photo');
  const cardTitle = cardElement.querySelector('.cards-grid__title');
  const likeCounter = cardElement.querySelector('.cards-grid__heart-counter');

  cardImage.src = card.link;
  cardImage.alt = 'фото ' + card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  //обработчик события лайк -----------------------
  const likeButton = cardElement.querySelector('.cards-grid__heart-button');

  if (card.likes.length !== 0) {
    card.likes.forEach((like) => {
      if (like._id.includes(profile._id)) {
        likeButton.classList.add('cards-grid__heart-button_active');
      } else {
        likeButton.classList.remove('cards-grid__heart-button_active');
      }
    });
  }

  likeButton.addEventListener('click', function (event) {
    if (likeButton.classList.contains('cards-grid__heart-button_active')) {
      api.uncheckHeart(card._id)
        .then((likes) => {
          toggleLike(likes, likeCounter, likeButton);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api.checkHeart(card._id)
        .then((likes,) => {
          toggleLike(likes, likeCounter, likeButton);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  //обработчик события удаление -------------------
  const trashButton = cardElement.querySelector('.cards-grid__trash-button');

  checkCardOwner(card, profile, trashButton); //проверка принадлежности карточки пользователю

  trashButton.addEventListener('click', function () {
    api.deleteOwnCard(card._id)
      .then(() => {
        trashButton.closest('.cards-grid__item').remove();
      })
      .catch(err => {
        console.log(`Ошибка удаления карточки: ${err}`);
      })
  });

  //обработчик события нажатия на изображение -----
  cardImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupImageValue.src = card.link;
    popupImageValue.alt = cardImage.alt;
    popupTitleValue.textContent = card.name;
  });

  return cardElement;
}

// Функция добавления карточки----------------------------------------------------------------------------------
function addBaseCard(card, profile) {
  const cardNew = createCard(card, profile);
  cardsList.append(cardNew); //загружаются в конец чтобы не конфликтовать с новыми
}

function addNewCard(card, profile) {
  const cardNew = createCard(card, profile);
  cardsList.prepend(cardNew); //загружаются в начало чтобы не конфликтовать со старыми
}

export {
  addBaseCard,
  addNewCard,
  cardsList,
  createCard,
};
