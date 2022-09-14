import {resetFormIfIsset, user, closePopupByEscape, openPopupUniversal, closePopupUniversal, profilePopup, formElement, nameInput, jobInput, profileTitleContainer, profileSubtitleContainer, handleProfileFormSubmit, handleAvatarFormSubmit, avatarFormElement, avatarPicElement} from './components/modal.js'
import {hasInvalidInput, toggleButtonState, isValid, showInputError, hideInputError, setEventListeners, enableValidation, enableValidationSettings, isPatternMismatch, } from './components/validate.js';
import {popupPicElement, cardTemplate, photoPopup, editPlaceName, addPlacePopup, editPlacePic, formElementAddPlace, addCard, handleCardFormSubmit, renderCard} from './components/card.js';
import {getCards, sendCard, deleteCard, setLike, unsetLike, changeAvatar, config, getInitialCards, getUser, sendUser} from './components/api.js';
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
  // очищаем форму попапа если она есть
  resetFormIfIsset(profilePopup);
});

// слушатели субмитов
formElementAddPlace.addEventListener('submit', handleCardFormSubmit);
formElement.addEventListener('submit', handleProfileFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

// Вызовем функцию
enableValidation(enableValidationSettings);

// отображаем карточки
getInitialCards()
  .then((result) => {
    // обрабатываем результат
    //console.log(result);
    const initialCards = result;
    // создаем карточки из массива карточек
    initialCards.forEach(function(item){
      const cardElement = addCard(item.name, item.link, item.likes, item.owner._id, item._id);
      renderCard(cardElement, 'append');
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

// получаем данные юзера
getUser()
  .then((result) => {
    // обрабатываем результат
    user.name = result.name;
    user.job = result.about;
    user.avatar = result.avatar;
    //user._id = result._id;
    //user.cohort = result.cohort;
    profileTitleContainer.textContent = result.name;
    profileSubtitleContainer.textContent = result.about;
    avatarPicElement.style.backgroundImage = `url(${user.avatar})`;
    //console.log(result);
    //console.log(user);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
