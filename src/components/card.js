//import {initialCards} from '../components/cards.js';
import {closePopupUniversal, openPopupUniversal} from '../components/modal.js';
import {config, deleteCard, like, sendCard} from '../components/api.js';
import {renderLoading} from '../components/validate.js';

export const cardTemplate = document.querySelector('#card').content;
// элемент попапа с фото
export const photoPopup = document.querySelector('.js-open-photo-popup');

export const addPlacePopup = document.querySelector('.js-add-place-popup');
export const formElementAddPlace = addPlacePopup.querySelector('.edit-profile');
export const editPlaceName = formElementAddPlace.querySelector('.edit-profile__name');
export const editPlacePic = formElementAddPlace.querySelector('.edit-profile__description');

export const popupPicElement = photoPopup.querySelector('.photo-pop-up__image');
const popupSubtitleElement = photoPopup.querySelector('.photo-pop-up__subtitle');
const places = document.querySelector('.places');

// функция проверки владением карточки
function amItheCardOwner(cardOwnerId, myId){
  // возвращает true если карточка наша
  if(myId === cardOwnerId){
    return true;
  }
  // возвращает else если карточка НЕ наша
  else{
    return false;
  }
}

// создаем функцию добавления карточки места
export function addCard(title, pic, likes, cardOwnerId, cardId){
  // клонируем содержимое шаблона карточки
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  // элемент фотографии карточки места
  const placePhotoElement = cardElement.querySelector('.place__photo');
  // элемент заголовка карточки места
  const placeNameElement = cardElement.querySelector('.place__name');
  // кнопка лайка
  const placeLikeButton = cardElement.querySelector('.place__like-btn');
  // элемент лайка карточки места
  const placeLikeQtyElement = cardElement.querySelector('.place__like-qty');
  // элемент корзин
  const placeDeleteButton = cardElement.querySelector('.place__delete-btn');

  // проверяем ставили мы лайк этой карточке или нет
  // и подсвечиваем кнопку если ставили
  likes.forEach(function(item){
    if(item._id === config.userId){
      placeLikeButton.classList.add('place__like-btn_pressed');
      return;
    }
  });

  // кол-во лайков карточки
  const likeQty = likes.length;
  // наполняем содержимым
  placePhotoElement.src = pic;
  placePhotoElement.alt = title;
  placeNameElement.textContent = title;
  placeLikeQtyElement.textContent = likeQty;

  // не отображаем корзину если мы не владельцы карточки
  if(!amItheCardOwner(cardOwnerId, config.userId)){
    placeDeleteButton.setAttribute('disabled', true);
  }

  // полноразмерный просмотр фото
  // открытие попапа
  placePhotoElement.addEventListener('click', (evt) => {
    openPopupUniversal(photoPopup);
    const photoLink = evt.target.getAttribute('src');
    const placeName = evt.target.nextElementSibling.textContent;
    popupPicElement.setAttribute('src', photoLink);
    popupPicElement.setAttribute('alt', placeName);
    popupSubtitleElement.textContent = placeName;
  });

  // слушатель лайков
  placeLikeButton.addEventListener('click', function(evt){
    // проверяем состояние кнопки
    const method = selectingLikeMethod(evt.target);
    // меняем ее состояние при нажатии
    evt.target.classList.toggle('place__like-btn_pressed');
    // отправляем на сервер запрос на добавление или снятие лайка
    like(method, cardId)
    .then((result) => {
      // обновляем счетчик карточки лайков в соответствии с ответом сервера
      placeLikeQtyElement.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  });
  // слушатель удаления места
  placeDeleteButton.addEventListener('click', function(evt){
    // вместо этой функции вызвать удаление карточки
    deleteCard(cardId)
      .then((result) => {
        // работаем с ответом
        evt.target.closest('.place').remove();
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  });
  // возвращаем готовый элемент с карточкой места
  return cardElement;
}

// в зависимости от состояния кнопки выбираем метод
// PUT
// DELETE
function selectingLikeMethod(element){
  let method;
  if(element.classList.contains('place__like-btn_pressed')){
    // если кнопка была нажата создаем метод DELETE для удаления лайка карточки
    method = 'DELETE';
  }
  else{
    method = 'PUT';
  }
  return method;
}

// функция кнопки отправки формы при добавлении нового места
export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  // получаем значения из инпутов
  const placeName = editPlaceName.value;
  const placePic = editPlacePic.value;
  // закрываем окно
  closePopupUniversal(addPlacePopup);
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
export function renderCard(cardElement, method){
  // отображаем на странице (с учетом последовательности)
  if(method === 'append'){
    places.append(cardElement);
  }
  else{
    places.prepend(cardElement);
  }
}
