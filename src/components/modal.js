import {addPlacePopup, photoPopup, formElementAddPlace} from '../components/card.js';


// элементы с именем и профессией профиля
export const nameInput = document.querySelector('.edit-profile__name');
export const jobInput = document.querySelector('.edit-profile__description');



export const profileTitleContainer = document.querySelector('.profile__title');
export const profileSubtitleContainer = document.querySelector('.profile__subtitle');


// переменные с именем/профессией профиля
export let profileTitle = profileTitleContainer.textContent;
export let profileSubtitle = profileSubtitleContainer.textContent;

export const popUp = document.querySelector('.js-edit-profile-popup');

export const formElement = popUp.querySelector('.edit-profile');

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
    closePopUp();
  }
}

// ф-я отслеживает нажатие кнопки ESC
// для мод окна фотографии
export function escPhotoPopup(evt){
  console.log(evt);
  if (evt.key === 'Escape'){
    closePopup(photoPopup);
    document.removeEventListener('keyup', escPhotoPopup);
  }
}

// ф-я открытия попапа добавления места
export function openAddPlacePopup(){
  openPopup(addPlacePopup);
  // создаем слушатель кнопки ESC
  document.addEventListener('keyup', escAddPlacePopup);
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
}

// ф-я открытия попапа
export function openPopup(popupElement){
  popupElement.classList.add('pop-up_opened');
}

// ф-я открытия модального окна редактирования профиля
export function openPopUp(){
  // открываем попап редактирования профиля
  openPopup(popUp);
  // добавляем текущие атрибуты полям редактирования профиля
  nameInput.setAttribute('value', profileTitle);
  jobInput.setAttribute('value', profileSubtitle);
  // создаем слушатель кнопки ESC
  document.addEventListener('keyup', escPopUp);
}

// ф-я закрытия модального окна редактирования профиля
export function closePopUp(){
  // закрываем попап редактирования профиля
  closePopup(popUp);
  // удаляем текущие атрибуты полям редактирования профиля
  formElement.reset();
  // удаляем слушатель кнопки ESC
  document.removeEventListener('keyup', escPopUp);
}

// ф-я отправки формы редактирования профиля
export function formSubmitHandler(evt) {
  evt.preventDefault();
  // сохраняем значения имени и профиля при отправке формы
  profileTitle = nameInput.value;
  profileSubtitle = jobInput.value;
  // присваиваем имя профиля на странице
  profileTitleContainer.textContent = profileTitle;
  profileSubtitleContainer.textContent = profileSubtitle;
  // закрываем окно
  closePopUp();
}
