// Функции отображения валидности/невалидности
const showInputError = (formElement, formInput, errorMessage, settings) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
};

const hideInputError = (formElement, formInput, settings) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput, settings) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  if (!formInput.validity.valid) { // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput, formInput.validationMessage, settings); // Передадим сообщение об ошибке вторым аргументом
  } else { // Если проходит, скроем
    hideInputError(formElement, formInput, settings);
  }
};

const hasInvalidInput = (inputsArray) => {
  return inputsArray.some((formInput) => { // Если поле не валидно, вернёт true
    return !formInput.validity.valid;
  })
};

// Функция которая меняет состояние кнопки сабмит в зависимости от результата валидации
const toggleButtonState = (inputsArray, buttonElement, settings) => {
  if (hasInvalidInput(inputsArray)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

// Комплексная функция работающая со всеми формами: валидность полей, слушатели, состояние сабмитов
const setEventListeners = (formElement, settings) => {
  const inputsArray = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector('.popup__button-submit');
  toggleButtonState(inputsArray, buttonElement, settings);
  inputsArray.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput, settings);
      toggleButtonState(inputsArray, buttonElement, settings);
    });
  });
};

// Глобальная функция включающая валидацию
const enableValidation = (settings) => {
  const formsArray = Array.from(document.querySelectorAll(settings.formSelector));
  formsArray.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

export {
  enableValidation,
 };
