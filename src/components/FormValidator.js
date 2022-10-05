export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorElementClassActive = config.errorElementClassActive;
    this._formElement = formElement;
  }

  // Валидируем поле
  _validateInput(inputElement, errorElement) {
    if (inputElement.validity.valid) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorElementClassActive);
    } else if (inputElement.validity.patternMismatch) {
      errorElement.textContent = inputElement.dataset.patternError;
      errorElement.classList.add(this._errorElementClassActive);
    } else {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorElementClassActive);
    }
  }

  // Переключение состояния кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    };
  };

  // Включение валидации формы
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      const errorElement = this._errorFieldForInput(this._formElement, inputElement);
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement, errorElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }

  // Валидируем форму
  validate() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      const errorElement = this._errorFieldForInput(this._formElement, inputElement);
      this._validateInput(inputElement, errorElement);
    });
  }

  // Валидация кнопки
  validateButton() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, submitButton);
  }

  // Проверка на невалидность поля
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Добавления сообщения об ошибке
  _errorFieldForInput(formElement, inputElement) {
    return formElement.querySelector(`.${inputElement.id}-error`);
  }
}
