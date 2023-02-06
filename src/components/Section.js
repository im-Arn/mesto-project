class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._container = container;
    this._renderer = renderer;
  }

  addItem (element) {
    this._container.prepend(element);
  }

  renderItems () {
    this._arrayItems = this._items.reverse();
    this._arrayItems.forEach(item => {
      const newItem = this._renderer(item);
      this.addItem(newItem);
    })
  }
}

export default Section
