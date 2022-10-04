import './pages/index.css'; // добавьте импорт главного файла стилей


import {api} from "./components/api.js";
import FormValidator from './components/FormValidator';
import UserInfo from './components/UserInfo';
import Card from './components/Card';
import PopupWithImamge from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';
import Section from './components/Section.js';
import {
  buttonAddPlaceOpen,
  editProfileButton,
  validatorConfig,
  addPlacePopupSelector,
  textButton,
  formsList,
  imagePopupConfig,
  addPlacePopupSubmitButton,
} from './utils/constants';

// перебираем формы страницы и на каждой запускаем валидацию
formsList.forEach(form => {
  const validator = new FormValidator(validatorConfig, form);
  validator.enableValidation();
});

// создаем попап добавления места
const addPlacePopup = new PopupWithForm(addPlacePopupSelector, (data) => {
  return api.sendCard(data);
}, textButton);
// слушатель кнопки добавления места
buttonAddPlaceOpen.addEventListener('click', () => {
  addPlacePopup.setEventListeners();
  addPlacePopup.open();
  // гасим кнопку субмита при открытии попапа доб места
  addPlacePopupSubmitButton.setAttribute('disabled', true);
});

// слушатель кнопки открытия попапа профиля
editProfileButton.addEventListener('click', () => {
  openPopupUniversal(profilePopup);
  // записываем актуальные данные из DOM
  setValuesToProfileInputs();
});


// экземпляр класса с полями информации о пользователе
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

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

    // создаем карточки мест
    const cardList = new Section({
      items: cards,
      renderer: (cardData) => {
        const card = new Card({
          // данные карточки
          data: cardData,
          // коллбек открытия попапа
          opener: (cardLink, cardName) => {
            const imagePopup = new PopupWithImamge(imagePopupConfig, cardLink, cardName);
            imagePopup.open();
          },
          // коллбек лайка карточки
          liker: (data) => {
            return api.like(data);
          },
          // колбек удаления карточки
          deleter: (cardId) => {
            return api.deleteCard(cardId);
          }
        }, '#card', userId);

        const cardElement = card.generate();
        cardList.addItem(cardElement);
      }
    }, '.places');

    cardList.renderItems();
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
  /*
  deleteCard(cardId)
    .then((result) => {
      deleteElementById(cardId);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  */
  api.deleteCard(cardId)
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
