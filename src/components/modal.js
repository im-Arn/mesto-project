const formElementProf = document.forms["popup-edit-profile"];
const formElementCard = document.forms["popup-add-cars"];

const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const popupsAll = document.querySelectorAll('.popup');

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

//обработчик крестика закрытия поп-апа -------------------------------------------------------------------------------
// popupCloseButtons.forEach(function (elem) {
//   const popupItem = elem.closest('.popup');
//   elem.addEventListener('click', function () {
//     closePopup(popupItem);
//   });
// });

popupCloseButtons.forEach(function (elem) {
  elem.addEventListener('click', function () {
    closePopup(popupsAll);
  });
});

// Функции Esc Click закрытия поп-апа -------------------------------------------------------------------------------
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupsAll);
    evt.target.removeEventListener('keydown', closePopupEsc); //удаляем слушатель
  };
}

function closePopupClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupsAll);
    evt.target.removeEventListener('click', closePopupClick); //удаляем слушатель
  };
}

// Функции закрытия открытия поп-апов --------------------------------------------------------------------------------

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupEsc); //добавляем слушатели
  document.addEventListener('click', closePopupClick);
}

function closePopup() {
  popupsAll.forEach( (elem) => {
    elem.classList.remove('popup_opened');
  });
}

export {
  formElementProf,
  formElementCard,
  popupsAll,
  openPopup,
  closePopup,
  profileButton,
  popupProfile,
  profileName,
  profileBio,
  profileNameInput,
  profileBioInput,
  сardsAddButton,
  popupCards,
  cardsImgInput,
  cardsTitleInput,
 };
