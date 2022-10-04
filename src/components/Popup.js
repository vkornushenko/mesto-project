export default class Popup{
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

//открытие попапа

  open() {
    this._popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this), {once: true});
  }

//закрытие попапа

  close() {
    this._popup.classList.remove('pop-up_opened');
  }

  setEventListeners() {
    //закрытие попапа по клику на оверлей

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('pop-up_opened')) {
        this.close();
      }
    });

    //закрытие попапа по клику на кнопку

    const closeButton = this._popup.querySelector('.edit-profile__close-btn');
    closeButton.addEventListener('click', this.close.bind(this));
  }

  //закрытие попапа по ESC

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
