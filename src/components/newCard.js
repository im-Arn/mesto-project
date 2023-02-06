class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  addItem(cardItem) {
    this._container.append(cardItem);
  }

  renderItems() {
    // this._initialArray = items;
    this._initialArray.forEach((item) => {
      const newCard = new Card(item); //получил
      const newCardElement = newCard.generate; //отрисовал
      this.addItem(newCardElement); //добавил

    });
  }
}


class Card {
  constructor(card, profile, template, { handleCardClick }, cardActions) {
    this._card = card;
    this._profile = profile;
    this._template = template
    this._handleCardClick = handleCardClick;
    this._cardActions = cardActions;
  }

  _getElement() {
    const cardElement = this._template.querySelector('.cards-grid__item').cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListener();

    this._element.querySelector('.cards-grid__photo').src = this._card.link;
    this._element.querySelector('.cards-grid__photo').alt = 'фото ' + this._card.name;
    this._element.querySelector('.cards-grid__title').textContent = this._card.name;
    this._element.querySelector('.cards-grid__heart-counter').textContent = this._card.likes.length;


    if (this._profile === this._card.owner._id) {
      this._element.querySelector('.cards-grid__trash-button').classList.add('cards-grid__trash-button_active');
    }

    if (this._card.likes.length) {
      this._card.likes.forEach((like) => {
        if (like._id.includes(this._profile)) {
          this._element.querySelector('.cards-grid__heart-button').classList.add('cards-grid__heart-button_active');
        } else {
          this._element.querySelector('.cards-grid__heart-button').classList.remove('cards-grid__heart-button_active');
        }
      })
    }

    return this._element;
  }

  _setEventListener() {
    this._element.querySelector('.cards-grid__photo').addEventListener('click', () => {
      this._handleCardClick();
    })

    this._element.querySelector('.cards-grid__heart-button').addEventListener('click', () => {
      this._cardActions.likeState(this._card, this._element.querySelector('.cards-grid__heart-counter'), this._element.querySelector('.cards-grid__heart-button'));
    })

    this._element.querySelector('.cards-grid__trash-button').addEventListener('click', (e) => {
      this._cardActions.deleteCard(this._card, e);
    })
  }
}


export default Card;
