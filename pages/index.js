const profileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileNameInput = document.querySelector('.popup__item_el_name');
const profileBioInput = document.querySelector('.popup__item_el_bio');

const сardsAddButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_cards');
const cardsImgInput = document.querySelector('.popup__item_el_img');
const cardsTitleInput = document.querySelector('.popup__item_el_title');

const popupCloseButtons = document.querySelectorAll('.popup__button-close');

const cardsList = document.querySelector('.cards-grid__list');
//функции закрытия открытия поп-апов --------------------------------------------------------------------------------
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

//обработчики события открытия поп-апов -----------------------------------------------------------------------------
profileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  profileNameInput.value = profileName.textContent;
  profileBioInput.value = profileBio.textContent;
});

сardsAddButton.addEventListener('click', function () {
  openPopup(popupCards);
});

//обработчик события закрытия поп-апа -------------------------------------------------------------------------------
popupCloseButtons.forEach(function (elem) {
  const popupItem = elem.closest('.popup');
  elem.addEventListener('click', function () {
    closePopup(popupItem);
  });
});

//темплэйт для карточек -------------------------------------------------------------------------------------------
function createCard(cardImageValue, cardTitleValue) {
  const cardTemplate = document.querySelector('.template-cards').content;
  const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards-grid__photo');
  const cardTitle = cardElement.querySelector('.cards-grid__title');

  cardImage.src = cardImageValue;
  cardImage.alt = 'фото ' + cardTitleValue;
  cardTitle.textContent = cardTitleValue;

  //обработчик события лайк ---------------------------------------------------------------------------------------
  const likeButton = cardElement.querySelector('.cards-grid__heart-button');

  likeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('cards-grid__heart-button_active');
  });
  //обработчик события удаление -----------------------------------------------------------------------------------
  const trashButton = cardElement.querySelector('.cards-grid__trash-button');

  trashButton.addEventListener('click', function () {
    const listItem = trashButton.closest('.cards-grid__item');
    listItem.remove();
  });
  //обработчик события нажатия на изображение ---------------------------------------------------------------------
  const popupImage = document.querySelector('.popup_image');
  const popupImageValue = document.querySelector('.popup__photo');
  const popupTitleValue = document.querySelector('.popup__subtitle');

  cardImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupImageValue.src = cardImageValue;
    popupImageValue.alt = cardImage.alt;
    popupTitleValue.textContent = cardTitleValue;
  });

  return cardElement;
}

function addCard(cardImageValue, cardTitleValue) {
  const cardNew = createCard(cardImageValue, cardTitleValue);
  cardsList.prepend(cardNew);
}

//функция объединяющая создание карточек ----------------------------------------------------------------------------

function getCardData(cardImageValue, cardTitleValue) {
  createCard(cardImageValue, cardTitleValue);
  addCard(cardImageValue, cardTitleValue);
}

//событие отправки формы --------------------------------------------------------------------------------------------
const formElementProf = document.forms["popup-edit-profile"];
const formElementCard = document.forms["popup-add-cars"];

function submitFormHandlerProf(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  closePopup(popupProfile);
}

formElementProf.addEventListener('submit', submitFormHandlerProf);

function submitFormHandlerCard(evt) {
  evt.preventDefault();
  getCardData(cardsImgInput.value, cardsTitleInput.value);
  formElementCard.reset();
  closePopup(popupCards);
}

formElementCard.addEventListener('submit', submitFormHandlerCard);


//массив карточек -------------------------------------------------------------------------------------------------
const BaseCards = [
  {
    title: 'Карачаевск',
    image: './images/kirill-pershin-1088404-unsplash.jpg',
  },
  {
    title: 'Горный Алтай',
    image: './images/evgenia-beletskaya-altai-unsplash.jpg',
  },
  {
    title: 'Домбай',
    image: './images/kirill-pershin-1556355-unsplash.jpg',
  },
  {
    title: 'Якутия',
    image: './images/mir.jpg',
  },
  {
    title: 'Озеро Иллиналта',
    image: './images/illialta.jpg',
  },
  {
    title: 'Курилы',
    image: './images/kurili.jpg',
  },
];

BaseCards.forEach(function (item) {
  const cardImageArrEl = item.image;
  const cardTitleArrEl = item.title;
  getCardData(cardImageArrEl, cardTitleArrEl);
});
