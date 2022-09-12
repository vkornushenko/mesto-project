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

}

// ф-я отправки формы редактирования профиля
export function handleProfileFormSubmit(evt) {
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
