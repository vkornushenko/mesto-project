// кнопки открытия
export const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const editAvatarButton = document.querySelector('.profile__edit-avatar-button');

// массив форм в попапах, для запуска валидации
export const formsList = Array.from(document.forms);

export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: 'fda1a505-797d-4787-a7e6-de98cdd912fd',
    'Content-Type': 'application/json'
  }
};

export const validatorConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  errorElementClassActive: 'edit-profile__input-error_active',
};

export const imagePopupConfig = {
  popupSelector: '.js-open-photo-popup',
  imageSelector: '.photo-pop-up__image',
  imageDescriptionSelector: '.photo-pop-up__subtitle'
};

export const addPlacePopupSelector = '.js-add-place-popup';
export const editProfilePopupSelector = '.js-edit-profile-popup';
export const editAvatarPopupSelector = '.js-set-new-avatar-popup';

export const addPlacePopupSubmitButton = document.querySelector(addPlacePopupSelector).querySelector('.edit-profile__submit');
export const editAvatarPopupSubmitButton = document.querySelector(editAvatarPopupSelector).querySelector('.edit-profile__submit');

export const nameField = document.querySelector('#profile-title-input');
export const descriptionField = document.querySelector('#profile-description-input');

export const addPlaceForm = document.forms['add-place'];
export const editProfileForm = document.forms['edit-profile'];
export const editAvatarForm = document.forms['edit-avatar'];
