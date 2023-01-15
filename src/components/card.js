import {
  openPopup,
} from './modal.js';

const cardsList = document.querySelector('.cards-grid__list'); //список карточек
const cardTemplate = document.querySelector('.template-cards').content; //темплейт карточки
const popupImageValue = document.querySelector('.popup__photo'); //темплейт карточки изображение
const popupTitleValue = document.querySelector('.popup__subtitle'); //темплейт карточки заголовок
const popupImage = document.querySelector('.popup_image'); //попап изображения
// const cardData = {
//   title: cardTitleValue,
//   image: cardImageValue
// };

//темплэйт для карточек ---------------------------------------------------------------------------------------------
function createCard(cardImageValue, cardTitleValue) {
  const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards-grid__photo');
  const cardTitle = cardElement.querySelector('.cards-grid__title');

  cardImage.src = cardImageValue;
  cardImage.alt = 'фото ' + cardTitleValue;
  cardTitle.textContent = cardTitleValue;

  //обработчик события лайк -----------------------
  const likeButton = cardElement.querySelector('.cards-grid__heart-button');

  likeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('cards-grid__heart-button_active');
  });
  //обработчик события удаление -------------------
  const trashButton = cardElement.querySelector('.cards-grid__trash-button');

  trashButton.addEventListener('click', function () {
    const listItem = trashButton.closest('.cards-grid__item');
    listItem.remove();
  });
  //обработчик события нажатия на изображение -----
  cardImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupImageValue.src = cardImageValue;
    popupImageValue.alt = cardImage.alt;
    popupTitleValue.textContent = cardTitleValue;
  });

  return cardElement;
}

// Функция добавления новой карточки----------------------------------------------------------------------------------
function addCard(cardImageValue, cardTitleValue) {
  const cardNew = createCard(cardImageValue, cardTitleValue);
  cardsList.prepend(cardNew);
}

// function addCard(cardData) {
//   const cardNew = createCard(cardData.image, cardData.title);
//   cardsList.prepend(cardNew);
// }

// Массив карточек----------------------------------------------------------------------------------------------------
import karachaevskImg from '../images/kirill-pershin-1088404-unsplash.jpg';
import altaiImg from '../images/evgenia-beletskaya-altai-unsplash.jpg';
import dombaiImg from '../images/1582615036119643712.jpg';
import yacutiaImg from '../images/mir.jpg';
import illinaltaImg from '../images/illialta.jpg';
import kuriliImg from '../images/kurili.jpg';

const BaseCards = [
  {
    title: 'Карачаевск',
    image: karachaevskImg,
  },
  {
    title: 'Горный Алтай',
    image: altaiImg,
  },
  {
    title: 'Домбай',
    image: dombaiImg,
  },
  {
    title: 'Якутия',
    image: yacutiaImg,
  },
  {
    title: 'Озеро Иллиналта',
    image: illinaltaImg,
  },
  {
    title: 'Курилы',
    image: kuriliImg,
  },
];

BaseCards.forEach(function (item) {
  const cardImageArrEl = item.image;
  const cardTitleArrEl = item.title;
  addCard(cardImageArrEl, cardTitleArrEl);
});

export {
  addCard,
 };
