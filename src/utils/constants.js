// кнопки открытия
export const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector('.profile__edit-button');
// массив форм в попапах, для запуска валидации
export const formsList = Array.from(document.forms);

export const validatorConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  errorElementClassActive: 'edit-profile__input-error_active',
}

export const textButton = 'Сохранение...';

export const imagePopupConfig = {
  popupSelector: '.js-open-photo-popup',
  imageSelector: '.photo-pop-up__image',
  imageDescriptionSelector: '.photo-pop-up__subtitle'
}

export const addPlacePopupSelector = '.js-add-place-popup';
export const addPlacePopupSubmitButton = document.querySelector(addPlacePopupSelector).querySelector('.edit-profile__submit');
