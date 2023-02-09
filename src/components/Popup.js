class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }

  /**
   * Публичный метод открытия попапа
   */
  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBound);
  }

  /**
   * Публичный метод закрытия попапа
   */
  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBound);
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

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    })
  }
}

export default Popup;
