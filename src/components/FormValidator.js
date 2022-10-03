//  в index добавить

//  const validatorConfig = {
//    inputSelector: '.form__input',
//    submitButtonSelector: '.form__button',
//    inactiveButtonClass: 'form__button-inactive',
//  }

//  const profileFormValidator = new FormValidator(validatorConfig, profileEditForm);
//  const addCardFormValidator = new FormValidator(validatorConfig, cardAddForm);
//  const avatarFormValidator = new FormValidator(validatorConfig, avatarEditForm);

export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass
    this._formElement = formElement;
  }

// Валидируем поле

  _validateInput(inputElement, errorElement) {
    if (inputElement.validity.valid) {
      errorElement.textContent = "";
    } else if (inputElement.validity.patternMismatch) {
      errorElement.textContent = inputElement.dataset.patternError;
    } else {
      errorElement.textContent = inputElement.validationMessage;
    }
  }

// Переключение состояния кнопки

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
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
