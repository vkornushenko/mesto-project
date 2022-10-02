export default class Card {
  constructor({data, liker, opener}, selector) {
    this._data = data;
    this._selector = selector;
    this._opener = opener;
    this._liker = liker;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    // Дописать после того, как разберемся с Popup
    this._element.addEventListener('click', () => {
      this._opener();
    });

    // Дописать после того, как разберемся с Api
    this._element.querySelector('.place__like-btn').addEventListener('click', () => {
      this._liker();
    });
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector('.card__image').style.backgroundImage = `url(${this.data.link})`;
    this._element.querySelector('.place__photo').textContent = this.data.name;

    return this._element;
  }
}






import {openPopupUniversal} from '../components/modal.js';
import {handleLikeCard, handleDeleteCard} from '../index.js';

export const cardTemplate = document.querySelector('#card').content;
// элемент попапа с фото
export const photoPopup = document.querySelector('.js-open-photo-popup');

export const buttonOpenPopupCard = document.querySelector('.js-add-place-popup');
export const formElementAddPlace = buttonOpenPopupCard.querySelector('.edit-profile');
export const editPlaceName = formElementAddPlace.querySelector('.edit-profile__name');
export const editPlacePic = formElementAddPlace.querySelector('.edit-profile__description');

export const popupPicElement = photoPopup.querySelector('.photo-pop-up__image');
const popupSubtitleElement = photoPopup.querySelector('.photo-pop-up__subtitle');
export const places = document.querySelector('.places');

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
export function addCard(title, pic, likes, cardOwnerId, cardId, userId){
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
    if(item._id === userId){
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
  // задаем id элементу места
  cardElement.setAttribute('id', cardId);

  // не отображаем корзину если мы не владельцы карточки
  if(!amItheCardOwner(cardOwnerId, userId)){
    placeDeleteButton.remove();
  }
  // вешаем слушатель на кнопку удаления карточки (если мы владельцы карточки)
  else{
    // слушаем кнопку удаления места -> удаляем с сервера -> потом из дом дерева по id
    placeDeleteButton.addEventListener('click', () => handleDeleteCard(cardId));
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

  /*
  let method = selectingLikeMethod(placeLikeButton);
  console.log(method);
  */
  // слушатель лайков
  placeLikeButton.addEventListener('click', () => handleLikeCard(cardId));

  // возвращаем готовый элемент с карточкой места
  return cardElement;
}



// в зависимости от состояния кнопки выбираем метод
// PUT
// DELETE
export function selectingLikeMethod(cardId){
  const element = document.getElementById(cardId).querySelector('.place__like-btn');
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

// ф-я удаления элемента по ID
export function deleteElementById(elementId){
  document.getElementById(elementId).remove();
}

// ф-я обновляет счетчик лайков у карточки (по ID карточки)
export function refreshLikeCounter(cardId, likeQtyFromServer){
  document.getElementById(cardId).querySelector('.place__like-qty').textContent = likeQtyFromServer;
}

// ф-я меняет состояние кнопки лайков на противоположное (по ID карточки)
export function toggleLikeButton(cardId){
  document.getElementById(cardId).querySelector('.place__like-btn').classList.toggle('place__like-btn_pressed');
}
