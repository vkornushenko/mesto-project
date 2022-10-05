export default class Card {
  constructor({ data, handleCardClick}, likeCard, deleteCard, selector, userId){
    this._data = data;
    this._selector = selector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._liker = likeCard;
    this._deleteCard = deleteCard;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  _togglePressedLikeButton() {
    if (this._data.likes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('place__like-btn_pressed');
    } else {
      this._likeButton.classList.remove('place__like-btn_pressed');
    }
  }

  _likeHandle() {
    const method = this._data.likes.some(like => like._id === this._userId) ? 'DELETE' : 'PUT';
    this._liker({ method, id: this._data._id})
      .then(data => {
        this._elementLikesQty.textContent = data.likes.length;
        this._data = data;
        this._togglePressedLikeButton();
      });
  }

  _deleteHandle(evt) {
    this._deleteCard(this._data._id)
      .then(() => { evt.target.parentNode.remove() });
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick(this._data.link, this._data.name);
    });

    this._likeButton.addEventListener('click', this._likeHandle.bind(this));

    this._deleteButton.addEventListener('click', this._deleteHandle.bind(this));
  }

  generate() {
    this._element = this._getElement();
    this._elementLikesQty = this._element.querySelector('.place__like-qty');
    this._deleteButton = this._element.querySelector('.place__delete-btn');
    this._elementPhoto = this._element.querySelector('.place__photo');
    this._likeButton = this._element.querySelector('.place__like-btn');

    this._setEventListeners();
    this._togglePressedLikeButton();
    this._elementLikesQty.textContent = this._data.likes.length;
    this._elementPhoto.src = this._data.link;
    this._element.querySelector('.place__name').textContent = this._data.name;
    this._deleteButton.disabled = this._userId != this._data.owner._id;

    return this._element;
  }
}
