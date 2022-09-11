import {closePopupByEscape, openPopupUniversal, closePopupUniversal, profilePopup, formElement, nameInput, jobInput, profileTitleContainer, profileSubtitleContainer, formSubmitHandler} from './components/modal.js'
import {hasInvalidInput, toggleButtonState, isValid, showInputError, hideInputError, setEventListeners, enableValidation, enableValidationSettings, isPatternMismatch, } from './components/validate.js';
import {popupPicElement, cardTemplate, photoPopup, editPlaceName, addPlacePopup, editPlacePic, formElementAddPlace, addCard, handleCardFormSubmit, renderCard} from './components/card.js';
import './pages/index.css'; // добавьте импорт главного файла стилей

// кнопки открытия
const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

// слушатель кнопки добавления места
buttonAddPlaceOpen.addEventListener('click', () => {
  openPopupUniversal(addPlacePopup);
});
// слушатель кнопки открытия попапа профиля
editProfileButton.addEventListener('click', () => {
  openPopupUniversal(profilePopup);
});

// слушатели субмитов
formElementAddPlace.addEventListener('submit', handleCardFormSubmit);
formElement.addEventListener('submit', formSubmitHandler);

// Вызовем функцию
enableValidation(enableValidationSettings);
