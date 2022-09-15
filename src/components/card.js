//import {initialCards} from '../components/cards.js';
import {closePopupUniversal, openPopupUniversal} from '../components/modal.js';
import {config, deleteCard, like, sendCard} from '../components/api.js';
import {renderLoading} from '../components/validate.js';

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
export function addCard(title, pic, likes, cardOwnerId, cardId, handleLikeCard, handleDeleteCard){
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
    placeDeleteButton.remove();
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

    handleLikeCard(method, cardId)
      .then((result) => {
      // обновляем счетчик карточки лайков в соответствии с ответом сервера
      placeLikeQtyElement.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });;

  });

  // слушатель удаления места
  placeDeleteButton.addEventListener('click', function(evt){
    handleDeleteCard(cardId)
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
