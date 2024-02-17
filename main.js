(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function o(o){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?t(Object(r),!0).forEach((function(t){var n,c,i,u;n=o,c=t,i=r[t],u=function(t,o){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(c),(c="symbol"==e(u)?u:String(u))in n?Object.defineProperty(n,c,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[c]=i})):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(e){Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(r,e))}))}return o}var n="wff-cohort-6",r="ecf17080-347b-483b-a076-f4b38ef76ef6";function c(e){document.querySelectorAll(".popup__button").forEach((function(t){t.textContent=e}))}function i(e,t,o,n,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),u=c.querySelector(".card__title"),a=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-count");return c.dataset.cardId=e._id,i.src=e.link,i.alt=e.name,u.textContent=e.name,l.textContent=e.likes.length,e.owner&&e.owner._id===r?(a.style.display="block",a.addEventListener("click",(function(){o(c,e)}))):a.style.display="none",e.likes.some((function(e){return e._id===r}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(){n(s,l,e)})),i.addEventListener("click",(function(){t(c)})),c}function u(e,t){var o;(o=t._id,fetch("https://mesto.nomoreparties.co/v1/".concat(n,"/cards/").concat(o),{method:"DELETE",headers:{authorization:r,"Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}))).then((function(){e.remove()})).catch((function(e){console.log("Ошибка: ".concat(e))}))}function a(e,t,o){var c;e.classList.contains("card__like-button_is_active")?(c=o._id,fetch("https://mesto.nomoreparties.co/v1/".concat(n,"/cards/likes/").concat(c),{method:"DELETE",headers:{authorization:r,"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){console.error("Ошибка при снятии лайка:",e)}))).then((function(o){e.classList.remove("card__like-button_is_active"),t.textContent=o.likes.length})).catch((function(e){console.log("Ошибка ".concat(e))})):function(e){return fetch("https://mesto.nomoreparties.co/v1/".concat(n,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:r,"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){console.error("Ошибка при постановке лайка:",e)}))}(o._id).then((function(o){e.classList.add("card__like-button_is_active"),t.textContent=o.likes.length})).catch((function(e){console.log("Ошибка ".concat(e))}))}function s(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")})),document.addEventListener("keydown",p)}function l(e){e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated")}),100),document.removeEventListener("keydown",p)}function p(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&l(t)}}function d(e){e.target===e.currentTarget&&l(e.currentTarget)}var f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__error-visible"};function m(e,t,o,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o),r.classList.remove(n),r.textContent=""}var _=function(e){return e.some((function(e){return!e.validity.valid}))};function y(e,t){_(e)?(t.disabled=!0,t.classList.add(f.submitButtonSelector)):(t.disabled=!1,t.classList.remove(f.submitButtonSelector))}function v(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);o.forEach((function(o){m(e,o,t.inputErrorClass,t.errorClass)})),y(o,n)}var h=document.querySelector(".places__list"),S="e14e130542e11349806adb20",b=fetch("https://mesto.nomoreparties.co/v1/".concat(n,"/users/me"),{headers:{authorization:r}}).then((function(e){return e.json()})).then((function(e){var t=document.querySelector(".profile__image"),o=document.querySelector(".profile__title"),n=document.querySelector(".profile__description");t.style.backgroundImage="url(".concat(e.avatar,")"),o.textContent=e.name,n.textContent=e.about})).catch((function(e){console.error("Ошибка при получении данных пользователя:",e)})),q=fetch("https://mesto.nomoreparties.co/v1/".concat(n,"/cards"),{headers:{authorization:r}}).then((function(e){return e.json()})).then((function(e){return e.map((function(e){return o(o({},e),{},{owner:o({},e.owner)})}))})).catch((function(e){console.error("Ошибка при получении карточек:",e)})).then((function(e){var t=e.map((function(e){return new Promise((function(t){var o=i(e,M,u,a,S);h.appendChild(o),t()}))}));return Promise.all(t)}));Promise.all([b,q]).then((function(){})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}));var k=document.querySelector(".popup_type_edit"),E=document.querySelector(".profile__edit-button"),g=k.querySelector(".popup__close"),L=document.forms["edit-profile"],C=document.querySelector(".popup__input_type_name"),j=document.querySelector(".popup__input_type_description"),O=document.querySelector(".profile__title"),w=document.querySelector(".profile__description");E.addEventListener("click",(function(){s(k),C.value=O.textContent,j.value=w.textContent,v(L,f)})),g.addEventListener("click",(function(){l(k)})),k.addEventListener("click",d),L.addEventListener("submit",(function(e){e.preventDefault();var t,o,i=C.value,u=j.value;t=i,o=u,c("Сохранение..."),fetch("https://mesto.nomoreparties.co/v1/".concat(n,"/users/me"),{method:"PATCH",headers:{authorization:r,"Content-Type":"application/json"},body:JSON.stringify({name:t,about:o})}).then((function(e){return e.json()})).then((function(e){c("Сохранить")})).catch((function(e){console.error("Ошибка при обновлении данных пользователя:",e),c("Сохранить")})),O.textContent=i,w.textContent=u,l(k)}));var P=document.querySelector(".popup_type_new-card"),T=P.querySelector(".popup__close"),x=document.querySelector(".profile__add-button"),A=document.forms["new-place"],D=document.querySelector(".popup__input_type_card-name"),z=document.querySelector(".popup__input_type_url");x.addEventListener("click",(function(){s(P),v(A,f),A.reset()})),T.addEventListener("click",(function(){l(P)})),A.addEventListener("submit",(function(e){e.preventDefault();var t,o,s,p={name:D.value,link:z.value,likes:[]},d=i(p,M,u,a,S);l(P),A.reset(),t=p.name,o=p.link,s=function(e){d.dataset.cardId=e._id;var t=d.querySelector(".card__like-button"),o=d.querySelector(".card__delete-button"),n=d.querySelector(".card__like-count");S===e.owner._id&&(o.style.display="block",o.addEventListener("click",(function(){u(d,e)}))),h.prepend(d),t.addEventListener("click",(function(){a(t,n,e)}))},c("Сохранение..."),fetch("https://mesto.nomoreparties.co/v1/".concat(n,"/cards"),{method:"POST",headers:{authorization:r,"Content-Type":"application/json"},body:JSON.stringify({name:t,link:o})}).then((function(e){return e.json()})).then((function(e){console.log("Новая карточка добавлена:",e),c("Сохранить"),s(e)})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),c("Сохранить")}))}));var B=document.querySelector(".popup_type_image"),I=B.querySelector(".popup__close"),N=B.querySelector(".popup__image"),J=B.querySelector(".popup__caption");function M(e){var t=e.querySelector(".card__image").src,o=e.querySelector(".card__image").alt;N.src=t,N.alt=o,J.textContent=o,s(B)}I.addEventListener("click",(function(){l(B)})),B.addEventListener("click",d);var H=document.querySelector(".profile__image"),V=document.querySelector(".popup_type_avatar"),U=V.querySelector(".popup__close"),F=document.forms["avatar-form"],G=document.querySelector(".popup__input_type_url");H.addEventListener("click",(function(){s(V),G.value="",v(F,f)})),U.addEventListener("click",(function(){l(V)})),V.addEventListener("click",d),F.addEventListener("submit",(function(e){e.preventDefault();var t,o=document.getElementById("avatar-link-input").value;t=o,c("Сохранение..."),fetch("https://mesto.nomoreparties.co/v1/".concat(n,"/users/me/avatar"),{method:"PATCH",headers:{authorization:r,"Content-Type":"application/json"},body:JSON.stringify({avatar:t})}).then((function(e){return e.json()})).then((function(e){console.log("Аватар успешно обновлен:",e),c("Да")})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),c("Да")})),H.style.backgroundImage="url(".concat(o,")"),l(V)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()}));var o=Array.from(t.querySelectorAll(e.inputSelector)),n=t.querySelector(e.submitButtonSelector);(function(e,t,o,n,r){var c=Array.from(e.querySelectorAll(t)),i=e.querySelector(o);c.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,o,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?m(e,t,o,n):function(e,t,o,n,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n),c.textContent=o,c.classList.add(r)}(e,t,t.validationMessage,o,n)}(e,t,n,r),y(c,i)}))}))})(t,e.inputSelector,e.submitButtonSelector,e.inputErrorClass,e.errorClass),y(o,n)}))}({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__error-visible"})})();