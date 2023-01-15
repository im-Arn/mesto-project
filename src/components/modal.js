const formElementProf = document.forms["popup-edit-profile"];
const formElementCard = document.forms["popup-add-cars"];

const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const popupsAll = document.querySelectorAll('.popup');

//обработчик крестика закрытия поп-апа -------------------------------------------------------------------------------
popupCloseButtons.forEach((elem) => {
  const popupItem = elem.closest('.popup');
  elem.addEventListener('click', function () {
    closePopup(popupItem);
  });
});

// Функции Esc Click закрытия поп-апа -------------------------------------------------------------------------------
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

popupsAll.forEach((item) => {
  item.addEventListener('click', function(evt) {
    if (evt.target === item) {
      closePopup(item);
    }
  })
});

// Функции закрытия открытия поп-апов --------------------------------------------------------------------------------

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupEsc); //добавляем слушатели
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc); //удаляем слушатель именно при закрытии каким бы образом оно не произошло
}

export {
  formElementProf,
  formElementCard,
  openPopup,
  closePopup,
 };
