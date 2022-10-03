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

//функции закрытия открытия поп-апов --------------------------------------------------------------------------------
function popupClose(popupElement) {
  popupElement.classList.remove('popup_opened');
};

function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');
};

//обработчики события открытия поп-апов -----------------------------------------------------------------------------
function clearInput(firstItemInput, secondItemInput) {
  firstItemInput.value = '';
  secondItemInput.value = '';
};

profileButton.addEventListener('click', function () {
  popupOpen(popupProfile);
  profileNameInput.value = profileName.textContent;
  profileBioInput.value = profileBio.textContent;
});

сardsAddButton.addEventListener('click', function () {
  popupOpen(popupCards);
  clearInput(cardsImgInput, cardsTitleInput);
});

//обработчик события закрытия поп-апа -------------------------------------------------------------------------------
popupCloseButtons.forEach(function (elem) {
  elem.addEventListener('click', function () {
    const popupItem = elem.closest('.popup');
    popupClose(popupItem);
  });
});

//темплэйт для карточек -------------------------------------------------------------------------------------------
function addCard(cardImageValue, cardTitleValue) {
  const cardTemplate = document.querySelector('.template-cards').content;
  const cardsList = document.querySelector('.cards-grid__list');
  const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);

  cardElement.querySelector('.cards-grid__photo').src = cardImageValue;
  cardElement.querySelector('.cards-grid__photo').alt = 'фото ' + cardTitleValue;
  cardElement.querySelector('.cards-grid__title').textContent = cardTitleValue;

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
  const image = cardElement.querySelector('.cards-grid__photo');
  const popupImage = document.querySelector('.popup_image');
  const popupImageValue = document.querySelector('.popup__photo');
  const popupTitleValue = document.querySelector('.popup__subtitle');

  image.addEventListener('click', function () {
    popupOpen(popupImage);
    popupImageValue.src = cardElement.querySelector('.cards-grid__photo').src;
    popupImageValue.alt = cardElement.querySelector('.cards-grid__photo').alt;
    popupTitleValue.textContent = cardElement.querySelector('.cards-grid__title').textContent;
  });

  cardsList.prepend(cardElement);//добавляем новый элемент в начало родителя
}

//функция получения данных карточек из инпута ---------------------------------------------------------------------

function getCardData() {
  addCard(cardsImgInput.value, cardsTitleInput.value);
}

//событие отправки формы --------------------------------------------------------------------------------------------
const formElementProf = document.querySelector('.popup__form-profile');
const formElementCard = document.querySelector('.popup__form-cards');

function formSubmitHandlerProf(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  clearInput(profileNameInput, profileBioInput);
  popupClose(popupProfile);
};

formElementProf.addEventListener('submit', formSubmitHandlerProf);

function formSubmitHandlerCard(evt) {
  evt.preventDefault();
  getCardData()
  clearInput(cardsImgInput, cardsTitleInput);
  popupClose(popupCards);
};

formElementCard.addEventListener('submit', formSubmitHandlerCard);


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
  const cardImage = item.image;
  const cardTitle = item.title;
  addCard(cardImage, cardTitle);
});
