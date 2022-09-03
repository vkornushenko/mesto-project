const addPlacePopup = document.querySelector('.js-add-place-popup');
const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
const buttonAddPlaceClose = addPlacePopup.querySelector('.edit-profile__close-btn');
const formElementAddPlace = addPlacePopup.querySelector('.edit-profile');
const editPlaceName = formElementAddPlace.querySelector('.edit-profile__name');
const editPlacePic = formElementAddPlace.querySelector('.edit-profile__description');
// элемент попапа с фото
const photoPopup = document.querySelector('.js-open-photo-popup');
const cardTemplate = document.querySelector('#card').content;
// Редактирование профиля
// блоки
const popUp = document.querySelector('.js-edit-profile-popup');
const formElement = popUp.querySelector('.edit-profile');
const profileTitleContainer = document.querySelector('.profile__title');
const profileSubtitleContainer = document.querySelector('.profile__subtitle');
// кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = popUp.querySelector('.edit-profile__close-btn');
// элементы с именем и профессией профиля
const nameInput = document.querySelector('.edit-profile__name');
const jobInput = document.querySelector('.edit-profile__description');
// переменные с именем/профессией профиля
let profileTitle = profileTitleContainer.textContent;
let profileSubtitle = profileSubtitleContainer.textContent;

buttonAddPlaceOpen.addEventListener('click', openAddPlacePopup);
buttonAddPlaceClose.addEventListener('click', closeAddPlacePopup);
formElementAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);
// слушатель закрытия попапа просмотра фотографии
photoPopup.querySelector('.edit-profile__close-btn').addEventListener('click', function(){
  // закрываем попап с фотографией
  closePopup(photoPopup);
  document.removeEventListener('keyup', escPhotoPopup);
});
// слушатели событий для редактирования профиля
editProfileButton.addEventListener('click', openPopUp);
closeProfileButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', formSubmitHandler);

// слушатель клика за пределы попапа редактирования профиля
// для попапа редактирования профиля
popUp.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopUp();
  }
});
// для попапа картинки
photoPopup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopup(photoPopup);
    document.removeEventListener('keyup', escPhotoPopup);
  }
});
// для попапа добавления места
addPlacePopup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget){
    closeAddPlacePopup();
  }
});

// ф-я отслеживает нажатие кнопки ESC
// для мод окна Добавления нового места
function escAddPlacePopup(evt){
  console.log(evt);
  if (evt.key === 'Escape'){
    closeAddPlacePopup();
  }
}

// ф-я отслеживает нажатие кнопки ESC
// для мод окна Редактирования профиля
function escPopUp(evt){
  console.log(evt);
  if (evt.key === 'Escape'){
    closePopUp();
  }
}

// ф-я отслеживает нажатие кнопки ESC
// для мод окна фотографии
function escPhotoPopup(evt){
  console.log(evt);
  if (evt.key === 'Escape'){
    closePopup(photoPopup);
    document.removeEventListener('keyup', escPhotoPopup);
  }
}

// ф-я открытия попапа добавления места
function openAddPlacePopup(){
  openPopup(addPlacePopup);
  // создаем слушатель кнопки ESC
  document.addEventListener('keyup', escAddPlacePopup);
}

function closeAddPlacePopup(){
  closePopup(addPlacePopup);
  formElementAddPlace.reset();
  // удаляем слушатель кнопки ESC
  document.removeEventListener('keyup', escAddPlacePopup);
}

// создаем функцию добавления карточки места
function addCard(title, pic){
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
// ф-я публикации карточки
function renderCard(cardElement, method){
  const places = document.querySelector('.places');
  // отображаем на странице (с учетом последовательности)
  if(method === 'append'){
    places.append(cardElement);
  }
  else{
    places.prepend(cardElement);
  }
}

// функция кнопки отправки формы при добавлении нового места
function formSubmitHandlerAddPlace(evt) {
  evt.preventDefault();
  // получаем значения из инпутов
  const placeName = editPlaceName.value;
  const placePic = editPlacePic.value;
  // закрываем окно
  closePopup(addPlacePopup);
  // делаем reset для формы
  formElementAddPlace.reset();
  // создаем карточку и отображаем ее
  cardElement = addCard(placeName, placePic);
  renderCard(cardElement, 'prepend');
}

// ф-я закрытия попапа
function closePopup(popupElement){
  popupElement.classList.remove('pop-up_opened');
}
// ф-я открытия попапа
function openPopup(popupElement){
  popupElement.classList.add('pop-up_opened');
}

// ф-я открытия модального окна редактирования профиля
function openPopUp(){
  // открываем попап редактирования профиля
  openPopup(popUp);
  // добавляем текущие атрибуты полям редактирования профиля
  nameInput.setAttribute('value', profileTitle);
  jobInput.setAttribute('value', profileSubtitle);
  // создаем слушатель кнопки ESC
  document.addEventListener('keyup', escPopUp);
}

// ф-я закрытия модального окна редактирования профиля
function closePopUp(){
  // закрываем попап редактирования профиля
  closePopup(popUp);
  // удаляем текущие атрибуты полям редактирования профиля
  formElement.reset();
  // удаляем слушатель кнопки ESC
  document.removeEventListener('keyup', escPopUp);
}

// ф-я отправки формы редактирования профиля
function formSubmitHandler(evt) {
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

// создаем карточки из массива карточек
initialCards.forEach(function(item){
  cardElement = addCard(item.name, item.link);
  renderCard(cardElement, 'append');
});
