class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._url = baseUrl;
    this._headers = headers;
  }

  // метод получения карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(response);
  }
  // другие методы работы с API
  // метод получения данных пользователя
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(response);
  }
  // метод удаления карточки
  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(response);
  }
  // метод отправки новой карточки на сервер
  sendCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      headers: this._headers
    })
    .then(response);
  }
  // метод лайка
  like(data){
    return fetch(`${this._url}/cards/${data.id}/likes`, {
      method: data.method,
      headers: this._headers
    })
    .then(response);
  }
  // метод отправки данных юзера
  sendUser(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: this._headers
    })
    .then(response);
  }
  // метод отправки аватарки на сервер
  sendAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      }),
      headers: this._headers
    })
    .then(response);
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: 'fda1a505-797d-4787-a7e6-de98cdd912fd',
    'Content-Type': 'application/json'
  }
});

// ф-я обработки ответа сервера
function response(res){
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

// СТАРЫЙ КОД!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// конфиг для отправки на сервер
/*
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: 'fda1a505-797d-4787-a7e6-de98cdd912fd',
    'Content-Type': 'application/json'
  }
}
*/
/*
// ф-я получает карточки с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
*/
/*
// удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
*/
/*
// ф-я ставит/снимает лайки
export const like = (method, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
*/
/*
// ф-я получает данные юзера
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
*/
/*
// ф-я отправляет данные юзера
export const sendUser = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    }),
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
*/
/*
// функция отправки новой карточки на сервер
export const sendCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    }),
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
*/
/*
// функция отправки аватарки на сервер
export const sendAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: `${avatar}`
    }),
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
*/
export default Api;
