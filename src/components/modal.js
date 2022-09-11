import {addPlacePopup, formElementAddPlace} from '../components/card.js';

// элементы с именем и профессией профиля
export const nameInput = document.querySelector('.edit-profile__name');
export const jobInput = document.querySelector('.edit-profile__description');
export const profileTitleContainer = document.querySelector('.profile__title');
export const profileSubtitleContainer = document.querySelector('.profile__subtitle');

// объект с именем/профессией профиля
const user = {name: profileTitleContainer.textContent, job: profileSubtitleContainer.textContent};

// элементы попапа профиля
export const profilePopup = document.querySelector('.js-edit-profile-popup');
export const formElement = profilePopup.querySelector('.edit-profile');

// ф-я закрытия попапа кнопкой ESC
export function closePopupByEscape(evt){
  if(evt.key === 'Escape'){
    // ищем открытый попап
    const openedPopup = document.querySelector('.pop-up_opened');
    // закрываем открытый попап универсальной ф-ей закрытия
    closePopupUniversal(openedPopup);
  }
}

// новая универсальная ф-я открытия попапов
export function openPopupUniversal(popupElement){
  // общие действия
  // слушатель кнопки закрытия попапа
  popupElement.querySelector('.edit-profile__close-btn').addEventListener('click', () => {
    closePopupUniversal(popupElement);
  });
  // слушатель клика по фону попапа
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget){
      closePopupUniversal(popupElement);
    }
  });
  // добавляем слушатель кнопки ESC
  document.addEventListener('keyup', closePopupByEscape);
  // открываем нужный попап
  popupElement.classList.add('pop-up_opened');
  // уникальные действия
  // для попапа профиля
  if(popupElement === profilePopup){
    // добавляем текущие атрибуты полям редактирования профиля
    nameInput.setAttribute('value', user.name);
    jobInput.setAttribute('value', user.job);
  }
  // для попапа места
  if(popupElement === addPlacePopup){
    // делаем кнопку отправки формы неактивной при открытии попапа
    const buttonElement = popupElement.querySelector('.edit-profile__submit');
    buttonElement.setAttribute('disabled', true);
  }
}

// новая универсальная ф-я закрытия попапов
export function closePopupUniversal(popupElement){
  // общие функции
  // удаляем слушатель кнопки ESC
  document.removeEventListener('keyup', closePopupByEscape);
  // закрываем попап
  popupElement.classList.remove('pop-up_opened');

  // уникальные функции
  // для попапа профиля
  if(popupElement === profilePopup){
    formElement.reset();
  }
  // для попапа места
  if(popupElement === addPlacePopup){
    formElementAddPlace.reset();
  }
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
  closePopupUniversal(profilePopup);
}
