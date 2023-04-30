(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{MG:()=>J,qJ:()=>N});var t=document.querySelector(".edit-profile__name"),n=document.querySelector(".edit-profile__description"),o=document.querySelector(".profile__title"),r=document.querySelector(".profile__subtitle"),c=document.querySelectorAll(".popup"),a={name:o.textContent,job:r.textContent},i=document.querySelector(".js-edit-profile-popup"),u=i.querySelector(".edit-profile"),l=document.querySelector(".profile__avatar"),s=document.querySelector(".profile__edit-avatar-button"),d=document.querySelector(".js-set-new-avatar-popup"),p=d.querySelector(".edit-profile"),f=document.querySelector(".avatar-url");function m(e){"Escape"===e.key&&y(document.querySelector(".pop-up_opened"))}function v(e){document.addEventListener("keyup",m),e.classList.add("pop-up_opened")}function y(e){document.removeEventListener("keyup",m),e.classList.remove("pop-up_opened"),function(e){var t=e.querySelector(".edit-profile");t&&t.reset()}(e)}c.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("pop-up_opened")&&y(e),t.target.classList.contains("edit-profile__close-btn")&&y(e)}))})),s.addEventListener("click",(function(e){v(d)}));var _={formSelector:".edit-profile",inputSelector:".form__input",submitButtonSelector:".edit-profile__submit",inputErrorClass:"form__input_type_error",errorClass:"edit-profile__input-error_active"};function h(e){var t=document.querySelector(".loading");e?t.value="Сохранение...":(t.value="Сохранить",t.classList.remove("loading"))}var b=function(e){var t=Array.from(e.querySelectorAll(_.inputSelector)),n=e.querySelector(_.submitButtonSelector);t.forEach((function(o){o.addEventListener("input",(function(){(function(e,t){"url"!=t.type&&S(t),t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(_.inputErrorClass),n.classList.remove(_.errorClass),n.textContent=""}(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(_.inputErrorClass),o.textContent=n,o.classList.add(_.errorClass)}(e,t,t.validationMessage)})(e,o),function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.removeAttribute("disabled"):t.setAttribute("disabled",!0)}(t,n)}))}))},S=function(e){e.value.match(/[^a-zа-яё \-]/i)?e.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):e.setCustomValidity("")},q=document.querySelector("#card").content,g=document.querySelector(".js-open-photo-popup"),E=document.querySelector(".js-add-place-popup"),k=E.querySelector(".edit-profile"),L=k.querySelector(".edit-profile__name"),j=k.querySelector(".edit-profile__description"),C=g.querySelector(".photo-pop-up__image"),A=g.querySelector(".photo-pop-up__subtitle"),x=document.querySelector(".places");function P(e,t,n,o,r,c){var a=q.querySelector(".place").cloneNode(!0),i=a.querySelector(".place__photo"),u=a.querySelector(".place__name"),l=a.querySelector(".place__like-btn"),s=a.querySelector(".place__like-qty"),d=a.querySelector(".place__delete-btn");n.forEach((function(e){e._id!==c||l.classList.add("place__like-btn_pressed")}));var p=n.length;return i.src=t,i.alt=e,u.textContent=e,s.textContent=p,a.setAttribute("id",r),function(e,t){return t===e}(o,c)?d.addEventListener("click",(function(){return J(r)})):d.remove(),i.addEventListener("click",(function(e){v(g);var t=e.target.getAttribute("src"),n=e.target.nextElementSibling.textContent;C.setAttribute("src",t),C.setAttribute("alt",n),A.textContent=n})),l.addEventListener("click",(function(){return N(r)})),a}var B,T={baseUrl:"https://nomoreparties.co/v1/plus-cohort-14",headers:{authorization:"fda1a505-797d-4787-a7e6-de98cdd912fd","Content-Type":"application/json"}},U=function(e){return fetch("".concat(T.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},O=function(e,t){return fetch("".concat(T.baseUrl,"/cards/likes/").concat(t),{method:e,headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},D=document.querySelector(".profile__add-button"),I=document.querySelector(".profile__edit-button");function w(e,t){"append"===t?x.append(e):x.prepend(e)}function J(e){U(e).then((function(t){var n;n=e,document.getElementById(n).remove()})).catch((function(e){console.log(e)}))}function N(e){var t=function(e){return document.getElementById(e).querySelector(".place__like-btn").classList.contains("place__like-btn_pressed")?"DELETE":"PUT"}(e);O(t,e).then((function(t){!function(e,t){document.getElementById(e).querySelector(".place__like-qty").textContent=t}(e,t.likes.length),function(e){document.getElementById(e).querySelector(".place__like-btn").classList.toggle("place__like-btn_pressed")}(e)})).catch((function(e){console.log(e)}))}D.addEventListener("click",(function(){v(E),E.querySelector(".edit-profile__submit").setAttribute("disabled",!0)})),I.addEventListener("click",(function(){v(i),t.setAttribute("value",o.textContent),n.setAttribute("value",r.textContent)})),k.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=L.value,r=j.value;e.target.querySelector(_.submitButtonSelector).classList.add("loading"),h(!0),(t=o,n=r,fetch("".concat(T.baseUrl,"/cards"),{method:"POST",body:JSON.stringify({name:"".concat(t),link:"".concat(n)}),headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){w(P(e.name,e.link,e.likes,e.owner._id,e._id,B),"prepend"),y(E),k.reset()})).catch((function(e){console.log(e)})).finally((function(){h(!1)}))})),u.addEventListener("submit",(function(e){var c,u;e.preventDefault(),e.target.querySelector(_.submitButtonSelector).classList.add("loading"),h(!0),(c=t.value,u=n.value,fetch("".concat(T.baseUrl,"/users/me"),{method:"PATCH",body:JSON.stringify({name:"".concat(c),about:"".concat(u)}),headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){a.name=t.value,a.job=n.value,o.textContent=t.value,r.textContent=n.value,y(i)})).catch((function(e){console.log(e)})).finally((function(){h(!1)}))})),p.addEventListener("submit",(function(e){var t;e.preventDefault(),e.target.querySelector(_.submitButtonSelector).classList.add("loading"),h(!0),(t=f.value,fetch("".concat(T.baseUrl,"/users/me/avatar"),{method:"PATCH",body:JSON.stringify({avatar:"".concat(t)}),headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){l.style.backgroundImage="url(".concat(e.avatar,")"),y(d)})).catch((function(e){console.log(e)})).finally((function(){h(!1)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),b(e)}))}(_),Promise.all([fetch("".concat(T.baseUrl,"/users/me"),{method:"GET",headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(T.baseUrl,"/cards"),{method:"GET",headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var c=e[0];c.name=e[0].name,c.job=e[0].about,c.avatar=e[0].avatar,c._id=e[0]._id,c.cohort=e[0].cohort,B=e[0]._id,o.textContent=c.name,r.textContent=c.job,l.style.backgroundImage="url(".concat(c.avatar,")"),t.setAttribute("value",c.name),n.setAttribute("value",c.job),e[1].forEach((function(e){w(P(e.name,e.link,e.likes,e.owner._id,e._id,B),"append")}))})).catch((function(e){console.log(e)}))})();