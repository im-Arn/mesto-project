// Сброс состояния сабмита поп-апов ==================================================================================
export const resetButtonState = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add('popup__button-submit_inactive');
};

export const renderLoading = (isLoading, button, a) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    if (button === a) {
      button.textContent = 'Создать';
    } else {
      button.textContent = 'Сохранить';
    }
  }
};
