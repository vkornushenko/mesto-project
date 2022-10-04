import Popup from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, textButton){
    super(popupSelector);
    this._form = this._popup.querySelector('.edit-profile');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._popupButton = this._popup.querySelector('.edit-profile__submit');
    this._submitHandler = submitHandler;
    this._textButton = textButton;
  }

  _getInputValues(){
    const formData = {};
    this._inputList.forEach((input) => (formData[input.name] = input.value));
    return formData;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const text = this._popupButton.innerText;
      this._popupButton.innerText = this._textButton;
      this._popupButton.disabled = true;

      this._submitHandler(this._getInputValues())
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._popupButton.innerText = text;
          this._popupButton.disabled = false;
        });
    });
  }

  close(){
    super.close();
    this._form.reset();
  }
}
export default PopupWithForm;
