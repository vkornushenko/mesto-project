import {user, closePopupByEscape, openPopupUniversal, closePopupUniversal, profilePopup, formElement, nameInput, jobInput, profileTitleContainer, profileSubtitleContainer, avatarFormElement, avatarPicElement} from './components/modal.js'
import {hasInvalidInput, toggleButtonState, isValid, showInputError, hideInputError, setEventListeners, enableValidation, enableValidationSettings, isPatternMismatch, renderLoading} from './components/validate.js';
import {popupPicElement, cardTemplate, photoPopup, editPlaceName, editPlacePic, buttonOpenPopupCard, formElementAddPlace, addCard, places} from './components/card.js';
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
  openPopupUniversal(buttonOpenPopupCard);
  // гасим кнопку субмита при открытии попапа доб места
  buttonOpenPopupCard.querySelector('.edit-profile__submit').setAttribute('disabled', true);
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
    // редактируем DOM элементы
    profileTitleContainer.textContent = user.name;
    profileSubtitleContainer.textContent = user.job;
    avatarPicElement.style.backgroundImage = `url(${user.avatar})`;
    // обрабатываем результат карточек
    const initialCards = values[1];
    // создаем карточки из массива карточек
    initialCards.forEach(function(item){
      const cardElement = addCard(item.name, item.link, item.likes, item.owner._id, item._id);
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
  // закрываем окно
  closePopupUniversal(buttonOpenPopupCard);
  // делаем reset для формы
  formElementAddPlace.reset();

  // вызываем ф-ю загрузки перед отправкой формы
  renderLoading(true);
  // отправляем данные новой карточки на сервер
  sendCard(placeName, placePic)
    .then((result) => {
      // обрабатываем результат
      const cardElement = addCard(result.name, result.link, result.likes, result.owner._id, result._id);
      // отображаем карточку ответа с сервера на сайте
      renderCard(cardElement, 'prepend');
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


// функция очищает форму если она есть у попапа
function resetFormIfIsset(popupElement){
  const form = popupElement.querySelector('.edit-profile');
  //console.log(form);
  if(form){
    form.reset();
  }
}











// ф-я отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // вызываем ф-ю загрузки перед отправкой формы
  renderLoading(true);
  // отправляем на сервер данные юзера
  sendUser(nameInput.value, jobInput.value)
    .then((result) => {
      // обрабатываем результат
      //console.log(result);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false);
    });
  // сохраняем значения имени и профиля при отправке формы
  // они отображаются в попапе профиля при повторном открытии
  user.name = nameInput.value;
  user.job = jobInput.value;
  // присваиваем имя профиля на странице
  profileTitleContainer.textContent = nameInput.value;
  profileSubtitleContainer.textContent = jobInput.value;
  // закрываем окно
  closePopupUniversal(profilePopup);
}


// ф-я отправки формы смены аватарки
export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  // получаем значения из инпутов
  //const avatar = .value;
  // вызываем ф-ю загрузки перед отправкой формы
  renderLoading(true);
  // отправляем ссылку на новый  аватар на сервер
  sendAvatar(avatarLinkInput.value)
    .then((result) => {
      // обрабатываем результат
      console.log(result);
      //const avatarUrl = result.avatar;
      //console.log(avatarUrl);
      //console.log(avatarPicElement);
      avatarPicElement.style.backgroundImage = `url(${avatarUrl})`;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false);
    });

  // закрываем окно попапа аватара
  closePopupUniversal(avatarPopup);
}
