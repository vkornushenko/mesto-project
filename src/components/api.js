export default class Api {
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
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(response);
  }

  // метод отправки новой карточки на сервер
  sendCard(data) {
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
  like(data) {
    return fetch(`${this._url}/cards/${data.id}/likes`, {
      method: data.method,
      headers: this._headers
    })
    .then(response);
  }

  // метод отправки данных юзера
  sendUser(data) {
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
  sendAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      }),
      headers: this._headers
    })
    .then(response);
  }
}

// ф-я обработки ответа сервера
function response(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
