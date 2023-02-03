import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._photo = popup.querySelector('.popup__photo');
    this._title = popup.querySelector('.popup__subtitle');
  }

  open(name, link) {
    this._photo.src = link;
    this._photo.alt = name;
    this._title.textContent = name;
    super.open()
  }
}

export default PopupWithImage