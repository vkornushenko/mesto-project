import {user, closePopupByEscape, openPopupUniversal, closePopupUniversal, profilePopup, formElement, nameInput, jobInput, profileTitleContainer, profileSubtitleContainer, handleProfileFormSubmit} from './components/modal.js'
import {hasInvalidInput, toggleButtonState, isValid, showInputError, hideInputError, setEventListeners, enableValidation, enableValidationSettings, isPatternMismatch, } from './components/validate.js';
import {popupPicElement, cardTemplate, photoPopup, editPlaceName, addPlacePopup, editPlacePic, formElementAddPlace, addCard, handleCardFormSubmit, renderCard} from './components/card.js';
import './pages/index.css'; // добавьте импорт главного файла стилей

// кнопки открытия
const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

// функция присваивает инпутам значения header и subtitle профиля
function setValuesToProfileInputs(){
  nameInput.setAttribute('value', user.name);
  jobInput.setAttribute('value', user.job);
}

// слушатель кнопки добавления места
buttonAddPlaceOpen.addEventListener('click', () => {
  openPopupUniversal(addPlacePopup);
  // гасим кнопку субмита при открытии попапа доб места
  addPlacePopup.querySelector('.edit-profile__submit').setAttribute('disabled', true);
});

// слушатель кнопки открытия попапа профиля
editProfileButton.addEventListener('click', () => {
  openPopupUniversal(profilePopup);
  setValuesToProfileInputs();
});



// слушатели субмитов
formElementAddPlace.addEventListener('submit', handleCardFormSubmit);
formElement.addEventListener('submit', handleProfileFormSubmit);

// Вызовем функцию
enableValidation(enableValidationSettings);
