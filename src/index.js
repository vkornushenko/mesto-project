import {profilePopup, formElement, nameInput, jobInput, profileTitleContainer, profileSubtitleContainer, profileTitle, profileSubtitle, escAddPlacePopup, escPopUp, escPhotoPopup, openAddPlacePopup, closeAddPlacePopup, closePopup, openPopup, openProfilePopup, closeProfilePopup, formSubmitHandler} from './components/modal.js'
import {hasInvalidInput, toggleButtonState, isValid, showInputError, hideInputError, setEventListeners, enableValidation, enableValidationSettings, isPatternMismatch, } from './components/validate.js';
import {cardTemplate, photoPopup, editPlaceName, addPlacePopup, editPlacePic, formElementAddPlace, addCard, handleCardFormSubmit, renderCard} from './components/card.js';
import './pages/index.css'; // добавьте импорт главного файла стилей

const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
const buttonAddPlaceClose = addPlacePopup.querySelector('.edit-profile__close-btn');

// кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = profilePopup.querySelector('.edit-profile__close-btn');

buttonAddPlaceOpen.addEventListener('click', openAddPlacePopup);
buttonAddPlaceClose.addEventListener('click', closeAddPlacePopup);

formElementAddPlace.addEventListener('submit', handleCardFormSubmit);

// слушатель закрытия попапа просмотра фотографии
photoPopup.querySelector('.edit-profile__close-btn').addEventListener('click', function(){
  // закрываем попап с фотографией
  closePopup(photoPopup);
  document.removeEventListener('keyup', escPhotoPopup);
});

// слушатели событий для редактирования профиля
editProfileButton.addEventListener('click', openProfilePopup);
closeProfileButton.addEventListener('click', closeProfilePopup);
formElement.addEventListener('submit', formSubmitHandler);

// слушатель клика за пределы попапа редактирования профиля
// для попапа редактирования профиля
profilePopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget){
    closeProfilePopup();
  }
});

// для попапа картинки
photoPopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopup(photoPopup);
    document.removeEventListener('keyup', escPhotoPopup);
  }
});

// для попапа добавления места
addPlacePopup.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget){
    closeAddPlacePopup();
  }
});

// Вызовем функцию
enableValidation(enableValidationSettings);
