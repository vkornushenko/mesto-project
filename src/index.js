import './pages/index.css';
import Api from "./components/Api.js";
import FormValidator from './components/FormValidator';
import UserInfo from './components/UserInfo';
import Card from './components/Card';
import PopupWithImamge from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';
import Section from './components/Section.js';
import {
  apiConfig,
  buttonAddPlaceOpen,
  editProfileButton,
  editAvatarButton,
  validatorConfig,
  addPlaceForm,
  editProfileForm,
  editAvatarForm,
  addPlacePopupSelector,
  imagePopupConfig,
  addPlacePopupSubmitButton,
  editAvatarPopupSubmitButton,
  editProfilePopupSelector,
  editAvatarPopupSelector,
  nameField,
  descriptionField
} from './utils/constants';

const api = new Api(apiConfig);

// объявляем глобальную переменную userId
let userId;
// получаем с сервера одновременно данные по пользователю и карточкам
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // id пользователя
    userId = userData._id;
    // редактируем DOM элементы профиля юзера (имя и профессия)
    userInfo.setUserInfo(userData.name, userData.about);
    // меняем аву
    userInfo.setAvatar(userData.avatar);
    // id пользователя
    userInfo.setUserId(userData._id);

    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(cardData) {
  const card = new Card({
    data : cardData,
    handleCardClick : (cardLink, cardName) => {
      const imagePopup = new PopupWithImamge(imagePopupConfig, cardLink, cardName);
      imagePopup.setEventListeners();
      imagePopup.open();
    }
  }, api.like.bind(api), api.deleteCard.bind(api), '#card', userId);

  return card.generate()
};

function handleAddPlaceSubmit(cardData) {
  return api.sendCard(cardData)
  .then((resData) => {
    cardList.addItem(createCard(resData));
  });
}

function handleEditProfileSubmit(userData) {
  return api.sendUser(userData)
    .then(({name, about}) => {
      userInfo.setUserInfo(name, about);
    });
}

function handleEditAvatarSubmit(data) {
  return api.sendAvatar(data.avatar)
    .then(resData => userInfo.setAvatar(resData.avatar));
}

const placeFormValidator = new FormValidator(validatorConfig, addPlaceForm);
placeFormValidator.enableValidation()

const profileFormValidator = new FormValidator(validatorConfig, editProfileForm);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validatorConfig, editAvatarForm);
avatarFormValidator.enableValidation();

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

// создаем попап изменения профиля
const editAvatarPopup = new PopupWithForm(
  editAvatarPopupSelector,
  handleEditAvatarSubmit,
  'Сохранение...'
);
editAvatarPopup.setEventListeners();

// слушатель кнопки добавления места
buttonAddPlaceOpen.addEventListener('click', () => {
  addPlacePopup.open();
  // гасим кнопку субмита при открытии попапа доб места
  addPlacePopupSubmitButton.setAttribute('disabled', true);
});

// слушатель кнопки изменения профиля
editProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameField.value = userData.name;
  descriptionField.value = userData.about;
  profileFormValidator.validate();
  editProfilePopup.open();
});

editAvatarButton.addEventListener('click', () => {
  editAvatarPopup.open();
  // гасим кнопку субмита при открытии попапа
  editAvatarPopupSubmitButton.setAttribute('disabled', true);
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
