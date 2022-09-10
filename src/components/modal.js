import {addPlacePopup, photoPopup, formElementAddPlace} from '../components/card.js';
import { isValid } from './validate.js';


// элементы с именем и профессией профиля
export const nameInput = document.querySelector('.edit-profile__name');
export const jobInput = document.querySelector('.edit-profile__description');
export const profileTitleContainer = document.querySelector('.profile__title');
export const profileSubtitleContainer = document.querySelector('.profile__subtitle');

// объект с именем/профессией профиля
const user = {name: profileTitleContainer.textContent, job: profileSubtitleContainer.textContent};

export const profilePopup = document.querySelector('.js-edit-profile-popup');

export const formElement = profilePopup.querySelector('.edit-profile');























// ф-я отслеживает нажатие кнопки ESC
// для мод окна Добавления нового места
export function escAddPlacePopup(evt){
  console.log(evt);
  if (evt.key === 'Escape'){
    closeAddPlacePopup();
  }
}

// ф-я отслеживает нажатие кнопки ESC
// для мод окна Редактирования профиля
export function escPopUp(evt){
  console.log(evt);
  if (evt.key === 'Escape'){
    closeProfilePopup();
  }
}

// ф-я отслеживает нажатие кнопки ESC
// для мод окна фотографии
export function escPhotoPopup(evt){
  console.log(evt);
  if (evt.key === 'Escape'){
    closePopup(photoPopup);
  }
}



// НОВОЕ
// НОВОЕ
// НОВОЕ

// 111
// написать универсальную функцию closePopup
// вместо
// closeAddPlacePopup()
// closeProfilePopup()
// closePopup(photoPopup)

// 222
// удалять и добавлять слушатели кнопки ESC функциями
// document.addEventListener('keyup', closePopupByEscape);
// document.removeEventListener('keyup', closePopupByEscape);


function closePopupByEscape(evt){
  if(evt.key === 'Escape'){
    // ищем открытый попап
    const openedPopup = document.querySelector('.pop-up_opened');
    // сюда нужно добавить функцию закрытия попапа
    // closePopup
  }
}

// pop-up_opened


























// ф-я открытия попапа добавления места
export function openAddPlacePopup(){
  openPopup(addPlacePopup);
  // создаем слушатель кнопки ESC
  document.addEventListener('keyup', escAddPlacePopup);
  const buttonElement = formElementAddPlace.querySelector('.edit-profile__submit');
  buttonElement.setAttribute('disabled', true);
}

export function closeAddPlacePopup(){
  closePopup(addPlacePopup);
  formElementAddPlace.reset();
  // удаляем слушатель кнопки ESC
  document.removeEventListener('keyup', escAddPlacePopup);
}

// ф-я закрытия попапа
export function closePopup(popupElement){
  popupElement.classList.remove('pop-up_opened');
  if (popupElement === photoPopup){
    document.removeEventListener('keyup', escPhotoPopup);
  }
}

// ф-я открытия попапа
export function openPopup(popupElement){
  popupElement.classList.add('pop-up_opened');
  if (popupElement === photoPopup){
    document.addEventListener('keyup', escPhotoPopup);
  }
}

// ф-я открытия модального окна редактирования профиля
export function openProfilePopup(){
  // открываем попап редактирования профиля
  openPopup(profilePopup);

  // добавляем текущие атрибуты полям редактирования профиля
  nameInput.setAttribute('value', user.name);
  jobInput.setAttribute('value', user.job);
  // создаем слушатель кнопки ESC
  document.addEventListener('keyup', escPopUp);
}

// ф-я закрытия модального окна редактирования профиля
export function closeProfilePopup(){
  // закрываем попап редактирования профиля
  closePopup(profilePopup);
  // удаляем текущие атрибуты полям редактирования профиля
  formElement.reset();
  // удаляем слушатель кнопки ESC
  document.removeEventListener('keyup', escPopUp);
}

// ф-я отправки формы редактирования профиля
export function formSubmitHandler(evt) {
  evt.preventDefault();
  // сохраняем значения имени и профиля при отправке формы
  // они отображаются в попапе профиля при повторном открытии
  user.name = nameInput.value;
  user.job = jobInput.value;
  // присваиваем имя профиля на странице
  profileTitleContainer.textContent = nameInput.value;
  profileSubtitleContainer.textContent = jobInput.value;
  // закрываем окно
  closeProfilePopup();
}
