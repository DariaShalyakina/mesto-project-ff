(()=>{"use strict";function e(e,t,o,r){var n=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=n.querySelector(".card__image"),c=n.querySelector(".card__title"),u=n.querySelector(".card__delete-button"),a=n.querySelector(".card__like-button");return i.src=e.link,i.alt=e.name,c.textContent=e.name,u.addEventListener("click",(function(){o(n)})),a.addEventListener("click",(function(){r(a)})),i.addEventListener("click",(function(){t(n)})),n}function t(e){e.remove()}function o(e){e.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")})),document.addEventListener("keydown",i)}function n(e){e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated")}),100),document.removeEventListener("keydown",i)}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&n(t)}}function c(e){e.target===e.currentTarget&&n(e.currentTarget)}var u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__error-visible"};function a(e,t,o,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o),n.classList.remove(r),n.textContent=""}var l=function(e){return e.some((function(e){return!e.validity.valid}))};function p(e,t){l(e)?(t.disabled=!0,t.classList.add(u.submitButtonSelector)):(t.disabled=!1,t.classList.remove(u.submitButtonSelector))}function s(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);o.forEach((function(o){a(e,o,t.inputErrorClass,t.errorClass)})),p(o,r)}var d=document.querySelector(".profile__image"),f=document.querySelector(".profile__title"),m=document.querySelector(".profile__description");fetch("https://mesto.nomoreparties.co/v1/".concat("wff-cohort-6","/users/me"),{headers:{authorization:"ecf17080-347b-483b-a076-f4b38ef76ef6"}}).then((function(e){return e.json()})).then((function(e){d.style.backgroundImage="url(".concat(e.avatar,")"),f.textContent=e.name,m.textContent=e.about})).catch((function(e){console.error("Ошибка при получении данных пользователя:",e)}));var _=document.querySelector(".places__list");[{name:"Manarola",link:"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Venice",link:"https://images.unsplash.com/photo-1553342385-111fd6bc6ab3?q=80&w=3036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Sunset in Bellagio",link:"https://images.unsplash.com/photo-1583855282680-6dbdc69b0932?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Lake Como",link:"https://images.unsplash.com/photo-1582150537993-71a12c56deb5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGl0YWx5fGVufDB8MXwwfHx8MA%3D%3D"},{name:"Bologna",link:"https://images.unsplash.com/photo-1603196552694-0b38104295d6?q=80&w=3089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Rome",link:"https://images.unsplash.com/photo-1621854071717-e9f7aa235173?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE4fHxpdGFseXxlbnwwfDF8MHx8fDA%3D"}].forEach((function(r){var n=e(r,G,t,o);_.appendChild(n)}));var y=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__edit-button"),S=y.querySelector(".popup__close"),b=document.forms["edit-profile"],x=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),h=document.querySelector(".profile__title"),w=document.querySelector(".profile__description");v.addEventListener("click",(function(){r(y),x.value=h.textContent,q.value=w.textContent,s(b,u)})),S.addEventListener("click",(function(){n(y)})),y.addEventListener("click",c),b.addEventListener("submit",(function(e){e.preventDefault(),h.textContent=x.value,w.textContent=q.value,n(y)}));var L=document.querySelector(".popup_type_new-card"),D=L.querySelector(".popup__close"),E=document.querySelector(".profile__add-button"),k=document.forms["new-place"],M=document.querySelector(".popup__input_type_card-name"),g=document.querySelector(".popup__input_type_url");E.addEventListener("click",(function(){r(L),s(k,u),k.reset()})),D.addEventListener("click",(function(){n(L)})),L.addEventListener("click",c),k.addEventListener("submit",(function(r){r.preventDefault();var i=e({name:M.value,link:g.value},G,t,o);_.prepend(i),n(L),k.reset()}));var C=document.querySelector(".popup_type_image"),A=C.querySelector(".popup__close"),B=C.querySelector(".popup__image"),H=C.querySelector(".popup__caption");function G(e){var t=e.querySelector(".card__image").src,o=e.querySelector(".card__image").alt;B.src=t,B.alt=o,H.textContent=o,r(C)}A.addEventListener("click",(function(){n(C)})),C.addEventListener("click",c),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()}));var o=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);(function(e,t,o,r,n){var i=Array.from(e.querySelectorAll(t)),c=e.querySelector(o);i.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,o,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,o,r):function(e,t,o,r,n){var i=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),i.textContent=o,i.classList.add(n)}(e,t,t.validationMessage,o,r)}(e,t,r,n),p(i,c)}))}))})(t,e.inputSelector,e.submitButtonSelector,e.inputErrorClass,e.errorClass),p(o,r)}))}({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__error-visible"})})();