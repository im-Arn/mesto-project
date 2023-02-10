
class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputsArray = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  /**
   *  Функции отображения ошибки валидности
   */
  _showInputError(formInput, errorMessage) {
    const formError = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._settings.errorClass);
  };

  /**
  *  Функции отображения скрытия ошибки валидности
  */
  _hideInputError(formInput) {
    const formError = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._settings.inputErrorClass);
    formError.classList.remove(this._settings.errorClass);
    formError.textContent = '';
  };

  /**
  * Функция, которая проверяет валидность поля
   */
  _isValid(formInput) {
    if (formInput.validity.patternMismatch) {
      formInput.setCustomValidity(formInput.dataset.errorMessage);
    } else {
      formInput.setCustomValidity("");
    }

    if (!formInput.validity.valid) { // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(formInput, formInput.validationMessage); // Передадим сообщение об ошибке вторым аргументом
    } else { // Если проходит, скроем
      this._hideInputError(formInput);
    }
  };

  _hasInvalidInput() {
    return this._inputsArray.some((formInput) => { // Если поле не валидно, вернёт true
      return !formInput.validity.valid;
    })
  };

  /**
   * Функция которая меняет состояние кнопки сабмит в зависимости от результата валидации
  */
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputsArray)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  };

  /**
  * Комплексная функция работающая со всеми формами: валидность полей, слушатели, состояние сабмитов
  */
  _setEventListeners() {
    this._toggleButtonState();
    this._inputsArray.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };
}

export default FormValidator
