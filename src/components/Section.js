class Section {
  constructor({ renderer }, container) {
    this._container = container;
    this._renderer = renderer;
  }

  /**
   * Публичный метод добавления элемента в разметку
   */
  addItem (element) {
    this._container.prepend(element);
  }

  /**
   * Публичный метод добавления массива в разметку
   */
  renderItems (cards) {
    this._items = cards;
    this._arrayItems = this._items.reverse();
    this._arrayItems.forEach(item => {
      const newItem = this._renderer(item);
      this.addItem(newItem);
    })
  }
}

export default Section
