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


// FORM VALIDATION
// BUTTON
// ф-я для проверки кнопки
const hasInvalidInput = (inputList) => {
  // проверяем все инпуты
  return inputList.some((input) => {
    //console.log(input.validity.valid);
    // если поле не валидно, колбэк вернет тру и обход массива прекратится
    return !input.validity.valid;
  })
};

// ф-я переключателя состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // делаем кнопку неактивной
    //buttonElement.classList.add('edit-profile__submit_inactive');
    buttonElement.setAttribute('disabled', true);
  }
  else {
    // иначе сделай кнопку активной
    //buttonElement.classList.remove('edit-profile__submit_inactive');
    buttonElement.removeAttribute('disabled');
  }
};




// INPUT VALIDATION
// ф-я проверки валидности поля
const isValid = (form, input) => {
  // условия проверки для кастомных ошибок
  // не вызываем функцию проверки паттерна, если тип поля инпута URL
  if(input.type != 'url'){
    isPatternMismatch(input);
  }

  // условие для стандартных ошибок
  if (!input.validity.valid) {
    // поле не прошло валидацию
    showInputError(form, input, input.validationMessage);
  }
  else {
    // поле прошло валидацию
    hideInputError(form, input);
  }
};















// ф-я добавления стиля ошибки не валидному полю
const showInputError = (form, input, errorMessage) => {
  /*
  console.log(form);
  console.log(input);
  console.log(errorMessage);
  */
  //находим элемент с ошибкой
  const errorElement = form.querySelector(`.${input.id}-error`);
  // подсвечиваем инпут с ошибкой и выдаем сообщение
  input.classList.add('form__input_type_error');

  errorElement.textContent = errorMessage;
  errorElement.classList.add('edit-profile__input-error_active');

  //console.log(errorMessage);
};
// ф-я удаления стиля ошибки у валидного поля
const hideInputError = (form, input) => {
  //находим элемент с ошибкой
  const errorElement = form.querySelector(`.${input.id}-error`);
  // удаляем стили ошибок и скрываем сообщение
  input.classList.remove('form__input_type_error');
  errorElement.classList.remove('edit-profile__input-error_active');
  errorElement.textContent = '';
}

// ф-я добавления слушателей всем полям формы
const setEventListeners = (form) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  //console.log(inputList);
  // создаем элемент кнопки относительно текущей формы
  const buttonElement = form.querySelector('.edit-profile__submit');
  // Обойдём все элементы полученной коллекции
  inputList.forEach((input) => {
    // каждому полю добавим обработчик события input
    input.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(form, input);
      // проверяем состояние кнопки
      toggleButtonState(inputList, buttonElement);


    });
  });
}

// добавление обработчиков всем формам
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.edit-profile'));
  // Переберём полученную коллекцию
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(form);
  });
};

// Вызовем функцию
enableValidation();




// REGULAR EXPRESSIONS
// ф-я ищет запрещенные символы
const isPatternMismatch = (input) => {
  console.log(input.type);
  // регулярное выражение ищет запрещенные символы
  const regex = /[^a-zа-яё \-]/i;
  // сообщение об ошибке
  const patternErrorMessage = 'Допускаются только латинские буквы и кириллические буквы, знаки дефиса и пробелы.';
  // получаем значения поля инпут
  const string = input.value;

  // проверяем знач. импута на соответствие паттерну
  // если выявили несоответствие паттерну
  if(string.match(regex)){
    input.setCustomValidity(patternErrorMessage);
  }
  // если инпут соответствует паттерну
  else{
    input.setCustomValidity("");
  }
}
