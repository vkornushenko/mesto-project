import Popup from "./Popup"

export default class PopupWithImage extends Popup {
  constructor(config, src, description) {
    super (config.popupSelector);
    this._src = src;
    this._description = description;
    this._popupImage = this._popup.querySelector(config.imageSelector);
    this._popupDescription = this._popup.querySelector(config.imageDescriptionSelector);
  }
//Открываем попап с картинкой

  open() {
    this._popupImage.src = this._src;
    this._popupDescription.innerText = this._description;
    super.open();
  }
}


//    В index.js потом добавить конфиг:
//
//    const imagePopupConfig = {
//      popupSelector: '.popup-image',
//      imageSelector: '.popup-image__img',
//      imageDescriptionSelector: '.popup-image__img-description'
//    }
