import {sendUser, sendAvatar} from './api.js';
import {renderLoading} from '../components/validate.js';

// элементы с именем и профессией профиля
export const nameInput = document.querySelector('.edit-profile__name');
export const jobInput = document.querySelector('.edit-profile__description');
export const profileTitleContainer = document.querySelector('.profile__title');
export const profileSubtitleContainer = document.querySelector('.profile__subtitle');
const popups = document.querySelectorAll('.popup');

// объект с именем/профессией профиля
export const user = {name: profileTitleContainer.textContent, job: profileSubtitleContainer.textContent};

// элементы попапа профиля
export const profilePopup = document.querySelector('.js-edit-profile-popup');
export const formElement = profilePopup.querySelector('.edit-profile');

// элемент с картинкой аватара
export const avatarPicElement = document.querySelector('.profile__avatar');
// элементы попапа смены аватара
const avatarButton = document.querySelector('.profile__edit-avatar-button');
const avatarPopup = document.querySelector('.js-set-new-avatar-popup');
export const avatarFormElement = avatarPopup.querySelector('.edit-profile');
export const avatarLinkInput = document.querySelector('.avatar-url');
//console.log(avatarLinkInput);

// ф-я закрытия попапа кнопкой ESC
export function closePopupByEscape(evt){
  if(evt.key === 'Escape'){
    // ищем открытый попап
    const openedPopup = document.querySelector('.pop-up_opened');
    // закрываем открытый попап универсальной ф-ей закрытия
    closePopupUniversal(openedPopup);
  }
}

// вешаем слушатели всем кнопкам закрытия попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('pop-up_opened')) {
      closePopupUniversal(popup);
    }
    if (evt.target.classList.contains('edit-profile__close-btn')) {
      closePopupUniversal(popup);
    }
  });
});

// новая универсальная ф-я открытия попапов
export function openPopupUniversal(popupElement){
  // общие действия
  // добавляем слушатель кнопки ESC
  document.addEventListener('keyup', closePopupByEscape);
  // открываем нужный попап
  popupElement.classList.add('pop-up_opened');
}

// функция очищает форму если она есть у попапа
export function resetFormIfIsset(popupElement){
  const form = popupElement.querySelector('.edit-profile');
  //console.log(form);
  if(form){
    form.reset();
  }
}

// новая универсальная ф-я закрытия попапов
export function closePopupUniversal(popupElement){
  // общие функции
  // удаляем слушатель кнопки ESC
  document.removeEventListener('keyup', closePopupByEscape);
  // закрываем попап
  popupElement.classList.remove('pop-up_opened');
  resetFormIfIsset(popupElement);
}

// слушатель кнопки смены аватарки
avatarButton.addEventListener('click', (evt) => {
  openPopupUniversal(avatarPopup);
});
