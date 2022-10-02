export default class Popup{
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

//открытие попапа

  open() {
    this._popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

//закрытие попапа

  close() {
    this._popup.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {

    //закрытие попапа по клику на оверлей

    const overlay = this._popup.querySelector('.pop-up');
    overlay.addEventListener('click', this.close);

    //закрытие попапа по клику на кнопку

    const closeButton = this._popup.querySelector('.edit-profile__close-btn');
    closeButton.addEventListener('click', this.close);
  }

  //закрытие попапа по ESC

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
