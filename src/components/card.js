
class Card {
  constructor(card, profile, template, { handleCardClick }, cardActions) {
    this._card = card;
    this._profile = profile;
    this._template = template
    this._handleCardClick = handleCardClick;
    this._cardActions = cardActions;
  }

  /**
   * Приватный метод получения разметки
   */
  _getElement() {
    const cardElement = this._template.querySelector('.cards-grid__item').cloneNode(true);
    return cardElement;
  }

  /**
   * Приватный метод создания слушателей
   */
  _setEventListener() {
    this._element.querySelector('.cards-grid__photo').addEventListener('click', () => {
      try {
        this._handleCardClick();
      } catch (error) {
        console.log(`Ошибка в handleCardClick: ${error}`);
      }
    })

    this._element.querySelector('.cards-grid__heart-button').addEventListener('click', () => {
      try {
        this._cardActions.likeState(this._card, this._element.querySelector('.cards-grid__heart-counter'), this._element.querySelector('.cards-grid__heart-button'));
      } catch (error) {
        console.log(`Ошибка в likeState: ${error}`);
      }
    })

    this._element.querySelector('.cards-grid__trash-button').addEventListener('click', (e) => {
      try {
        this._cardActions.deleteCard(this._card, e);
      } catch (error) {
        console.log(`Ошибка в deleteCard: ${error}`);
      }
    })
  }

  /**
   * Публичный метод создания элемент разметки
   */
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
}


export default Card;
