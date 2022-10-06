export default class FormValidator {
  constructor(config, formElement) {
    this._errorElementClassActive = config.errorElementClassActive;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
  }

// Показываем ошибку
  _showError(inputElement, errorElement) {
    if (inputElement.validity.patternMismatch) {
      errorElement.textContent = inputElement.dataset.patternError;
      errorElement.classList.add(this._errorElementClassActive);
    } else {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorElementClassActive);
    }
  }

// Скрываем ошибку
  _hideError(errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorElementClassActive);
  }

// Валидируем поле

  _validateInput(inputElement, errorElement) {
    inputElement.validity.valid ? this._hideError(errorElement) : this._showError(inputElement, errorElement);
  }

// Переключение состояния кнопки

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    };
  };

// Включение валидации формы

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      const errorElement = this._findErrorFieldForInput(inputElement);
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement, errorElement);
        this._toggleButtonState();
      });
    });
  }

// Валидируем форму

  validate() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      const errorElement = this._findErrorFieldForInput(inputElement);
      this._validateInput(inputElement, errorElement);
    });
  }

// Валидация кнопки

  validateButton() {
    this._toggleButtonState();
  }

// Проверка на невалидность поля

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

// Добавления сообщения об ошибке

  _findErrorFieldForInput(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

// Сбрасываем ошибки и состояние кнопки

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideError(this._findErrorFieldForInput(inputElement));
    });
  }
}
