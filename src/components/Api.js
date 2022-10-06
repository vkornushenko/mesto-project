// ф-я обработки ответа сервера
function checkResponse(res){
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

function sendRequest(url, options) {
  // принимает два аргумента: урл и объект опций
  return fetch(url, options).then(checkResponse)
}

class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._url = baseUrl;
    this._headers = headers;
  }

  // метод получения карточек
  getInitialCards() {
    return sendRequest(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }
  // другие методы работы с API
  // метод получения данных пользователя
  getUser() {
    return sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }
  // метод удаления карточки
  deleteCard(id){
    return sendRequest(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }
  // метод отправки новой карточки на сервер
  sendCard(data){
    return sendRequest(`${this._url}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      headers: this._headers
    });
  }
  // метод лайка
  like(data){
    return sendRequest(`${this._url}/cards/${data.id}/likes`, {
      method: data.method,
      headers: this._headers
    });
  }
  // метод отправки данных юзера
  sendUser(data){
    return sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: this._headers
    });
  }
  // метод отправки аватарки на сервер
  sendAvatar(avatar){
    return sendRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      }),
      headers: this._headers
    });
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: 'fda1a505-797d-4787-a7e6-de98cdd912fd',
    'Content-Type': 'application/json'
  }
});

export default Api;
