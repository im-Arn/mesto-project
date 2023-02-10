
class Card {
  constructor(card, profile, template, { handleCardClick, deleteLike, putLike, deleteCard}) {
    this._card = card;
    this._profile = profile;
    this._template = template
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._deleteLike = deleteLike;
    this._putLike = putLike;
    this.toggleHeartState = this.toggleHeartState.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.delete = this.delete.bind(this);
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

    this._element.querySelector('.cards-grid__heart-button').addEventListener('click', (e) => {
      this._handleLikeClick(e);
    })

    this._element.querySelector('.cards-grid__trash-button').addEventListener('click', () => {
      this.delete();
    })
  }

  toggleHeartState (e, data) {
    this._likeCount.textContent = data.likes.length;
    e.target.classList.toggle('cards-grid__heart-button_active');
  }

  _handleLikeClick (e) {
    if(e.target.classList.contains('cards-grid__heart-button_active')) {
      try {
        this._deleteLike(e, this._card)
      } catch (error) {
        console.log(`Ошибка удаления лайка: ${error}`)
      }
    } else {
      try {
        this._putLike(e, this._card)
      } catch (error) {
        console.log(`Ошибка постановки лайка: ${err}`)
      }
    }
  }

  delete() {
    try {
      this._deleteCard(this._card);
    } catch (error) {
      console.log(`Ошибка в deleteCard: ${error}`);
    }
  }

  deleteItem() {
    this._element.remove();
  }

  /**
   * Публичный метод создания элемент разметки
   */
  generate() {
    this._element = this._getElement();
    this._setEventListener();
    this._likeButton = this._element.querySelector('.cards-grid__heart-button');
    this._likeCount = this._element.querySelector('.cards-grid__heart-counter');
    this._image = this._element.querySelector('.cards-grid__photo');
    this._image.src = this._card.link;
    this._image.alt = 'фото ' + this._card.name;
    this._element.querySelector('.cards-grid__title').textContent = this._card.name;
    this._likeCount.textContent = this._card.likes.length;


    if (this._profile === this._card.owner._id) {
      this._element.querySelector('.cards-grid__trash-button').classList.add('cards-grid__trash-button_active');
    }

    if (this._card.likes.length) {
      this._card.likes.forEach((like) => {
        if (like._id.includes(this._profile)) {
          this._likeButton.classList.add('cards-grid__heart-button_active');
        } else {
          this._likeButton.classList.remove('cards-grid__heart-button_active');
        }
      })
    }

    return this._element;
  }
}


export default Card;
