const addPlacePopup = document.querySelector('.js-add-place-popup');
const buttonAddPlaceOpen = document.querySelector('.profile__add-button');
const buttonAddPlaceClose = addPlacePopup.querySelector('.edit-profile__close-btn');
const formElementAddPlace = addPlacePopup.querySelector('.edit-profile');
const editPlaceName = formElementAddPlace.querySelector('.edit-profile__name');
const editPlacePic = formElementAddPlace.querySelector('.edit-profile__description');

buttonAddPlaceOpen.addEventListener('click', openAddPlacePopUp);
buttonAddPlaceClose.addEventListener('click', closeAddPlacePopup);
formElementAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);

function openAddPlacePopUp(){
  addPlacePopup.classList.add('pop-up_opened');
}

function closeAddPlacePopup(){
  addPlacePopup.classList.remove('pop-up_opened');
  formElementAddPlace.reset();
}

// создаем функцию добавления карточки места
function addCard(title, pic, method){

  const places = document.querySelector('.places');
  const cardTemplate = document.querySelector('#card').content;
  // клонируем содержимое шаблона карточки
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  // элемент попапа с фото
  const photoPopup = document.querySelector('.js-open-photo-popup');
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

    photoPopup.querySelector('.photo-pop-up__image').setAttribute('src', photoLink);
    photoPopup.querySelector('.photo-pop-up__subtitle').textContent = placeName;

    photoPopup.classList.add('pop-up_opened');
  });
  // закрытие попапа
  photoPopup.querySelector('.edit-profile__close-btn').addEventListener('click', function(evt){
    photoPopup.classList.remove('pop-up_opened');
  });

  // сюда добавим лайканье
  cardElement.querySelector('.place__like-btn').addEventListener('click', function(evt){
    evt.target.classList.toggle('place__like-btn_pressed');
  });

  // удаление места
  cardElement.querySelector('.place__delete-btn').addEventListener('click', function(evt){
    evt.target.parentElement.remove();
  })

  // отображаем на странице (с учетом последовательности)
  if(method === 'append'){
    places.append(cardElement);
  }
  else{
    places.prepend(cardElement);
  }
}


// создаем карточки из массива карточек
initialCards.forEach(function(item){
  addCard(item.name, item.link, 'append');
});


// функция кнопки отправки формы при добавлении нового места
function formSubmitHandlerAddPlace(evt) {
  evt.preventDefault();
  // получаем значения из инпутов
  let placeName = editPlaceName.value;
  let placePic = editPlacePic.value;
  // записываем две переменных в массив "места"
  let newPlace = {
    name: placeName,
    link: placePic
    };
  // добавляем новое "место" в начало массива
  initialCards.unshift(newPlace);
  // закрываем окно
  closeAddPlacePopup();
  // делаем reset для формы
  formElementAddPlace.reset();
  addCard(placeName, placePic, 'prepend');
}


// Редактирование профиля
// блоки
const popUp = document.querySelector('.js-edit-profile-popup');
const formElement = popUp.querySelector('.edit-profile');
const profileTitleContainer = document.querySelector('.profile__title');
const profileSubtitleContainer = document.querySelector('.profile__subtitle');
// кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = popUp.querySelector('.edit-profile__close-btn');

const nameInput = document.querySelector('.edit-profile__name');
const jobInput = document.querySelector('.edit-profile__description');

let profileTitle = profileTitleContainer.textContent;
let profileSubtitle = profileSubtitleContainer.textContent;

// ф-я открытия модального окна редактирования профиля
function openPopUp(){

  popUp.classList.add('pop-up_opened');

  // добавляем текущие атрибуты полям редактирования профиля
  nameInput.setAttribute('value', profileTitle);
  jobInput.setAttribute('value', profileSubtitle);

}

// ф-я закрытия профиля
function closePopUp(){
  popUp.classList.remove('pop-up_opened');
  // удаляем текущие атрибуты полям редактирования профиля
  formElement.reset();
}

// ф-я отправки формы
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

// обработчики событий для редактирования профиля
editProfileButton.addEventListener('click', openPopUp);
closeProfileButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', formSubmitHandler);
