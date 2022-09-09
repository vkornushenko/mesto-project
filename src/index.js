import {popUp, formElement, nameInput, jobInput, profileTitleContainer, profileSubtitleContainer, profileTitle, profileSubtitle, escAddPlacePopup, escPopUp, escPhotoPopup, openAddPlacePopup, closeAddPlacePopup, closePopup, openPopup, openPopUp, closePopUp, formSubmitHandler} from './components/modal.js'
import {hasInvalidInput, toggleButtonState, isValid, showInputError, hideInputError, setEventListeners, enableValidation, isPatternMismatch, } from './components/validate.js';
//import {initialCards} from './components/cards.js';
import {cardTemplate, photoPopup, editPlaceName, addPlacePopup, editPlacePic, formElementAddPlace, addCard, formSubmitHandlerAddPlace, renderCard} from './components/card.js';
import '../pages/index.css'; // добавьте импорт главного файла стилей


const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
const buttonAddPlaceClose = addPlacePopup.querySelector('.edit-profile__close-btn');



// Редактирование профиля
// блоки



// кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = popUp.querySelector('.edit-profile__close-btn');




buttonAddPlaceOpen.addEventListener('click', openAddPlacePopup);
buttonAddPlaceClose.addEventListener('click', closeAddPlacePopup);


formElementAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);




// слушатель закрытия попапа просмотра фотографии
photoPopup.querySelector('.edit-profile__close-btn').addEventListener('click', function(){
  // закрываем попап с фотографией
  closePopup(photoPopup);
  document.removeEventListener('keyup', escPhotoPopup);
});

// слушатели событий для редактирования профиля
editProfileButton.addEventListener('click', openPopUp);
closeProfileButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', formSubmitHandler);

// слушатель клика за пределы попапа редактирования профиля
// для попапа редактирования профиля
popUp.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopUp();
  }
});

// для попапа картинки
photoPopup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopup(photoPopup);
    document.removeEventListener('keyup', escPhotoPopup);
  }
});

// для попапа добавления места
addPlacePopup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget){
    closeAddPlacePopup();
  }
});

// Вызовем функцию
enableValidation();
