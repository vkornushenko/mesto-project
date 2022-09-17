import {user, closePopupByEscape, openPopupUniversal, closePopupUniversal, profilePopup, formElement, nameInput, jobInput, profileTitleContainer, profileSubtitleContainer, avatarFormElement, avatarPicElement, avatarLinkInput, avatarPopup} from './components/modal.js'
import {hasInvalidInput, toggleButtonState, isValid, showInputError, hideInputError, setEventListeners, enableValidation, enableValidationSettings, isPatternMismatch, renderLoading} from './components/validate.js';
import {popupPicElement, cardTemplate, photoPopup, editPlaceName, editPlacePic, buttonOpenPopupCard, formElementAddPlace, addCard, places, selectingLikeMethod, deleteElementById, refreshLikeCounter, toggleLikeButton} from './components/card.js';
import {getCards, sendCard, deleteCard, config, getInitialCards, getUser, sendUser, like, sendAvatar} from './components/api.js';
import './pages/index.css'; // добавьте импорт главного файла стилей

// кнопки открытия
const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

// функция присваивает инпутам значения header и subtitle профиля
function setValuesToProfileInputs(){
  nameInput.setAttribute('value', profileTitleContainer.textContent);
  jobInput.setAttribute('value', profileSubtitleContainer.textContent);
}

// слушатель кнопки добавления места
buttonAddPlaceOpen.addEventListener('click', () => {
  openPopupUniversal(buttonOpenPopupCard);
  // гасим кнопку субмита при открытии попапа доб места
  buttonOpenPopupCard.querySelector('.edit-profile__submit').setAttribute('disabled', true);
});

// слушатель кнопки открытия попапа профиля
editProfileButton.addEventListener('click', () => {
  openPopupUniversal(profilePopup);
  // записываем актуальные данные из DOM
  setValuesToProfileInputs();
});

// слушатели субмитов
formElementAddPlace.addEventListener('submit', handleCardFormSubmit);
formElement.addEventListener('submit', handleProfileFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

// Вызовем функцию
enableValidation(enableValidationSettings);

// объявляем глобальную переменную userId
let userId;

// получаем с сервера одновременно данные по пользователю и карточкам
Promise.all([getUser(), getInitialCards()])
  .then(values => {
    // получаем два массива (юзер + карточки):
    // данные пользователя
    const user = values[0];
    // обрабатываем результат пользователя
    user.name = values[0].name;
    user.job = values[0].about;
    user.avatar = values[0].avatar;
    user._id = values[0]._id;
    user.cohort = values[0].cohort;

    userId = values[0]._id;

    // редактируем DOM элементы
    profileTitleContainer.textContent = user.name;
    profileSubtitleContainer.textContent = user.job;
    avatarPicElement.style.backgroundImage = `url(${user.avatar})`;
    // записываем данные в инпуты тоже
    nameInput.setAttribute('value', user.name);
    jobInput.setAttribute('value', user.job);
    // обрабатываем результат карточек
    const initialCards = values[1];
    // создаем карточки из массива карточек
    initialCards.forEach(function(item){
      const cardElement = addCard(item.name, item.link, item.likes, item.owner._id, item._id, userId);
      renderCard(cardElement, 'append');
    });

  })
  .catch((err) => {
    console.log(err);
  });

// функция кнопки отправки формы при добавлении нового места
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  // получаем значения из инпутов
  const placeName = editPlaceName.value;
  const placePic = editPlacePic.value;
  // задаем кнопке субмита класс loading
  evt.target.querySelector(enableValidationSettings.submitButtonSelector).classList.add('loading');
  // вызываем ф-ю загрузки перед отправкой формы
  renderLoading(true);
  // отправляем данные новой карточки на сервер
  sendCard(placeName, placePic)
    .then((result) => {
      // обрабатываем результат
      const cardElement = addCard(result.name, result.link, result.likes, result.owner._id, result._id, userId);
      // отображаем карточку ответа с сервера на сайте
      renderCard(cardElement, 'prepend');
      // закрываем окно добавления карточки
      closePopupUniversal(buttonOpenPopupCard);
      // делаем reset для формы
      formElementAddPlace.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false);
    });
}

// ф-я публикации карточки
function renderCard(cardElement, method){
  // отображаем на странице (с учетом последовательности)
  if(method === 'append'){
    places.append(cardElement);
  }
  else{
    places.prepend(cardElement);
  }
}

// ф-я отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // получаем кнопку субмита с которой будем работать во время загрузки
  //const button = evt.target.querySelector(enableValidationSettings.submitButtonSelector);
  // задаем кнопке субмита класс loading
  evt.target.querySelector(enableValidationSettings.submitButtonSelector).classList.add('loading');
  // вызываем ф-ю загрузки перед отправкой формы
  renderLoading(true);
  // отправляем на сервер данные юзера
  sendUser(nameInput.value, jobInput.value)
    .then((result) => {
      // обрабатываем результат
      // сохраняем значения имени и профиля при отправке формы
      // они отображаются в попапе профиля при повторном открытии
      user.name = nameInput.value;
      user.job = jobInput.value;
      // присваиваем имя профиля на странице
      profileTitleContainer.textContent = nameInput.value;
      profileSubtitleContainer.textContent = jobInput.value;
      // закрываем окно
      closePopupUniversal(profilePopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false);
    });
}

// ф-я отправки формы смены аватарки
export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  // задаем кнопке субмита класс loading
  evt.target.querySelector(enableValidationSettings.submitButtonSelector).classList.add('loading');
  // вызываем ф-ю загрузки перед отправкой формы
  renderLoading(true);
  // отправляем ссылку на новый  аватар на сервер
  sendAvatar(avatarLinkInput.value)
    .then((result) => {
      // обрабатываем результат
      //console.log(result);
      avatarPicElement.style.backgroundImage = `url(${result.avatar})`;
      // закрываем окно попапа аватара
      closePopupUniversal(avatarPopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false);
    });
}

// обработчик удаления карточки места
export function handleDeleteCard(cardId){
  deleteCard(cardId)
    .then((result) => {
      deleteElementById(cardId);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// обработчик кнопки лайка карточки места
export function handleLikeCard(cardId){
  // сначала узнаем убрать или поставить лайк
  const method = selectingLikeMethod(cardId);
  // отправляем запрос на добавление/удаление лайка
  like(method, cardId)
    .then((result) => {
      // обновим счетчик лайков у карточки
      refreshLikeCounter(cardId, result.likes.length);
      // поменяем состояние кнопки
      toggleLikeButton(cardId);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}
