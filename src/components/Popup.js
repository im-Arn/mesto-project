class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  /**
   * Публичный метод открытия попапа
   */
  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  /**
   * Публичный метод закрытия попапа
   */
  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  /**
   * Приватный метод обработчика события Esc
   */
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  /**
   * Публичный метод создания слушателей
   */
  setEventListeners () {
    this._popup.querySelector('.popup__button-close')
    .addEventListener('click', this.close.bind(this));

    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    })
  }
}

export default Popup;
