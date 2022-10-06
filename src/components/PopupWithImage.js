import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(config) {
    super (config.popupSelector);
    this._popupImage = this._popup.querySelector(config.imageSelector);
    this._popupDescription = this._popup.querySelector(config.imageDescriptionSelector);
  }
//Открываем попап с картинкой

  open(src, description) {
    this._popupImage.src = src;
    this._popupImage.alt = description;
    this._popupDescription.innerText = description;
    super.open();
  }
}
