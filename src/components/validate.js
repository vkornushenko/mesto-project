// BUTTON
// ф-я для проверки кнопки
export const hasInvalidInput = (inputList) => {
  // проверяем все инпуты
  return inputList.some((input) => {
    //console.log(input.validity.valid);
    // если поле не валидно, колбэк вернет тру и обход массива прекратится
    return !input.validity.valid;
  })
};

// ф-я переключателя состояния кнопки
export const toggleButtonState = (inputList, buttonElement) => {
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

// INPUT
// ф-я проверки валидности поля
export const isValid = (form, input) => {
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
export const showInputError = (form, input, errorMessage) => {
  //находим элемент с ошибкой
  const errorElement = form.querySelector(`.${input.id}-error`);
  // подсвечиваем инпут с ошибкой и выдаем сообщение
  input.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('edit-profile__input-error_active');
};

// ф-я удаления стиля ошибки у валидного поля
export const hideInputError = (form, input) => {
  //находим элемент с ошибкой
  const errorElement = form.querySelector(`.${input.id}-error`);
  // удаляем стили ошибок и скрываем сообщение
  input.classList.remove('form__input_type_error');
  errorElement.classList.remove('edit-profile__input-error_active');
  errorElement.textContent = '';
}

// ф-я добавления слушателей всем полям формы
export const setEventListeners = (form) => {
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
export const enableValidation = () => {
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

// REGULAR EXPRESSIONS
// ф-я ищет запрещенные символы
export const isPatternMismatch = (input) => {
  console.log(input.type);
  // регулярное выражение ищет запрещенные символы
  const regex = /[^a-zа-яё \-]/i;
  // сообщение об ошибке
  const patternErrorMessage = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
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