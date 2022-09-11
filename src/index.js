import {closePopupByEscape, openPopupUniversal, closePopupUniversal, profilePopup, formElement, nameInput, jobInput, profileTitleContainer, profileSubtitleContainer, formSubmitHandler} from './components/modal.js'
import {hasInvalidInput, toggleButtonState, isValid, showInputError, hideInputError, setEventListeners, enableValidation, enableValidationSettings, isPatternMismatch, } from './components/validate.js';
import {popupPicElement, cardTemplate, photoPopup, editPlaceName, addPlacePopup, editPlacePic, formElementAddPlace, addCard, handleCardFormSubmit, renderCard} from './components/card.js';
import './pages/index.css'; // добавьте импорт главного файла стилей

const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
const buttonAddPlaceClose = addPlacePopup.querySelector('.edit-profile__close-btn');

// кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = profilePopup.querySelector('.edit-profile__close-btn');


// слушатель кнопки добавления места
buttonAddPlaceOpen.addEventListener('click', () => {
  openPopupUniversal(addPlacePopup);
});

// слушатель кнопки открытия попапа профиля
editProfileButton.addEventListener('click', () => {
  openPopupUniversal(profilePopup);
});

// слушатель клика по картинке создаем в файле card.js
// при рендере карточек



// СЛУШАТЕЛИ КНОПОК ЗАКРЫТИЯ ПОПАПОВ
// слушатель кнопки закрытия попапа места
buttonAddPlaceClose.addEventListener('click', () => {
  closePopupUniversal(addPlacePopup);
});

// слушатель кнопки закрытия попапа профиля
closeProfileButton.addEventListener('click', () => {
  closePopupUniversal(profilePopup);
});

// слушатель кнопки закрытия попапа фотографии
photoPopup.querySelector('.edit-profile__close-btn').addEventListener('click', function(){
  // закрываем попап с фотографией
  closePopupUniversal(photoPopup);
});

// СЛУШАТЕЛИ КЛИКОВ ПО ФОНУ ПОПАПОВ
// слушатель клика по фону попапа места
addPlacePopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopupUniversal(addPlacePopup);
  }
});

// слушатель клика по фону попапа места профиля
profilePopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopupUniversal(profilePopup);
  }
});

// слушатель клика по фону попапа картинки
photoPopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopupUniversal(photoPopup);
  }
});


// слушатели субмитов
formElementAddPlace.addEventListener('submit', handleCardFormSubmit);
formElement.addEventListener('submit', formSubmitHandler);

// Вызовем функцию
enableValidation(enableValidationSettings);
