// Класс Section отвечает за отрисовку элементов на странице

// Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
// Вы получаете эти данные от Api.
// Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.

export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

// Метод отвечает за отрисовку всех элементов

  renderItems() {
    this._items.forEach(this._renderer);
  }

// Метод принимает DOM-элемент и добавляет его в контейнер

  addItem(item) {
    this._container.append(item);
  }
}
