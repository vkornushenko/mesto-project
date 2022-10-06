import './pages/index.css'; // добавьте импорт главного файла стилей

import {api} from "./components/Api.js";
import FormValidator from './components/FormValidator';
import UserInfo from './components/UserInfo';
import Card from './components/Card';
import PopupWithImamge from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';
import Section from './components/Section.js';
import {
  buttonAddPlaceOpen,
  editProfileButton,
  editAvatarButton,
  validatorConfig,
  addPlacePopupSelector,
  imagePopupConfig,
  editProfilePopupSelector,
  editAvatarPopupSelector,
} from './utils/constants';


function createCard(cardData) {
  const card = new Card({
    data : cardData,
    handleCardClick : (cardLink, cardName) => {
      imagePopup.open(cardLink, cardName);
    }
  }, api.like.bind(api), api.deleteCard.bind(api), '#card', userId);

  return card.generate()
};

function handleAddPlaceSubmit(cardData) {
  return api.sendCard(cardData)
  .then((resData) => {
    cardList.addItem(createCard(resData));
  })
  .catch(error => console.log(error));
}

function handleEditProfileSubmit(userData) {
  return api.sendUser(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch(error => console.log(error));
}

function handleEditAvatarSubmit(data) {
  return api.sendAvatar(data.avatar)
    .then(resData => userInfo.setAvatar(resData.avatar))
    .catch(error => console.log(error));
}

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.forms)
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validatorConfig);

// создаем попап добавления места
const addPlacePopup = new PopupWithForm(
  addPlacePopupSelector,
  handleAddPlaceSubmit,
  'Создание...'
);
addPlacePopup.setEventListeners();

// создаем попап изменения профиля
const editProfilePopup = new PopupWithForm(
  editProfilePopupSelector,
  handleEditProfileSubmit,
  'Сохранение...'
);
editProfilePopup.setEventListeners();

// создаем попап изменения аватара профиля
const editAvatarPopup = new PopupWithForm(
  editAvatarPopupSelector,
  handleEditAvatarSubmit,
  'Сохранение...'
);
editAvatarPopup.setEventListeners();

const imagePopup = new PopupWithImamge(imagePopupConfig);
imagePopup.setEventListeners();

// слушатель кнопки добавления места
buttonAddPlaceOpen.addEventListener('click', () => {
  formValidators['add-place'].resetValidation();
  addPlacePopup.open();
  // гасим кнопку субмита при открытии попапа доб места
});

// слушатель кнопки изменения профиля
editProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  editProfilePopup.setInputValues(userData);
  formValidators['edit-profile'].resetValidation();
  editProfilePopup.open();
});

editAvatarButton.addEventListener('click', () => {
  editAvatarPopup.open();
  // гасим кнопку субмита при открытии попапа
  formValidators['edit-avatar'].resetValidation();
});

// экземпляр класса с полями информации о пользователе
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

// создаем экземпляр секции
const cardList = new Section({
  items: null,
  renderer: (cardData) => {
    cardList.addItem(createCard(cardData));
  }
}, '.places');

// объявляем глобальную переменную userId
let userId;
// получаем с сервера одновременно данные по пользователю и карточкам
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // id пользователя
    userId = userData._id;
    // Устанавливаем данные пользователя
    userInfo.setUserInfo(userData);

    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
