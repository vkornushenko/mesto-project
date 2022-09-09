import {initialCards} from '../components/cards.js';
import {openPopup, escPhotoPopup, closePopup} from '../components/modal.js';

export const cardTemplate = document.querySelector('#card').content;
// элемент попапа с фото
export const photoPopup = document.querySelector('.js-open-photo-popup');

export const addPlacePopup = document.querySelector('.js-add-place-popup');
export const formElementAddPlace = addPlacePopup.querySelector('.edit-profile');
export const editPlaceName = formElementAddPlace.querySelector('.edit-profile__name');
export const editPlacePic = formElementAddPlace.querySelector('.edit-profile__description');

// создаем карточки из массива карточек
initialCards.forEach(function(item){
  const cardElement = addCard(item.name, item.link);
  renderCard(cardElement, 'append');
});

// создаем функцию добавления карточки места
export function addCard(title, pic){
  // клонируем содержимое шаблона карточки
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  // элемент фотографии карточки места
  const placePhotoElement = cardElement.querySelector('.place__photo');
  // элемент заголовка карточки места
  const placeNameElement = cardElement.querySelector('.place__name');
  // наполняем содержимым
  placePhotoElement.src = pic;
  placePhotoElement.alt = title;
  placeNameElement.textContent = title;
  // полноразмерный просмотр фото
  // открытие попапа
  placePhotoElement.addEventListener('click', function(evt){
    const photoLink = evt.target.getAttribute('src');
    const placeName = evt.target.nextElementSibling.textContent;
    const popupPicElement = photoPopup.querySelector('.photo-pop-up__image');
    const popupSubtitleElement = photoPopup.querySelector('.photo-pop-up__subtitle');
    popupPicElement.setAttribute('src', photoLink);
    popupPicElement.setAttribute('alt', placeName);
    popupSubtitleElement.textContent = placeName;
    // открываем попап с фотографией
    openPopup(photoPopup);
    document.addEventListener('keyup', escPhotoPopup);
  });
  // слушатель лайков
  cardElement.querySelector('.place__like-btn').addEventListener('click', function(evt){
    evt.target.classList.toggle('place__like-btn_pressed');
  });
  // слушатель удаления места
  cardElement.querySelector('.place__delete-btn').addEventListener('click', function(evt){
    evt.target.closest('.place').remove();
  });
  // возвращаем готовый элемент с карточкой места
  return cardElement;
}

// функция кнопки отправки формы при добавлении нового места
export function formSubmitHandlerAddPlace(evt) {
  evt.preventDefault();
  // получаем значения из инпутов
  const placeName = editPlaceName.value;
  const placePic = editPlacePic.value;
  // закрываем окно
  closePopup(addPlacePopup);
  // делаем reset для формы
  formElementAddPlace.reset();
  // создаем карточку и отображаем ее
  const cardElement = addCard(placeName, placePic);
  renderCard(cardElement, 'prepend');
}

// ф-я публикации карточки
export function renderCard(cardElement, method){
  const places = document.querySelector('.places');
  // отображаем на странице (с учетом последовательности)
  if(method === 'append'){
    places.append(cardElement);
  }
  else{
    places.prepend(cardElement);
  }
}
