(()=>{"use strict";var e="https://mesto.nomoreparties.co/v1/".concat("wff-cohort-6"),t="ecf17080-347b-483b-a076-f4b38ef76ef6",n=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function o(o){return fetch("".concat(e,"/cards/likes/").concat(o),{method:"PUT",headers:{authorization:t,"Content-Type":"application/json"}}).then(n)}function r(o){return fetch("".concat(e,"/cards/likes/").concat(o),{method:"DELETE",headers:{authorization:t,"Content-Type":"application/json"}}).then(n)}function c(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),a=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-count");return c.dataset.cardId=e._id,i.src=e.link,i.alt=e.name,a.textContent=e.name,s.textContent=e.likes.length,e.owner&&e.owner._id===r?(u.style.display="block",u.addEventListener("click",(function(){n(c,e)}))):u.style.display="none",e.likes.some((function(e){return e._id===r}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){o(l,s,e)})),i.addEventListener("click",(function(){t(c)})),c}function i(o,r){var c;(c=r._id,fetch("".concat(e,"/cards/").concat(c),{method:"DELETE",headers:{authorization:t,"Content-Type":"application/json"}}).then(n)).then((function(){o.remove()})).catch((function(e){console.log("Ошибка: ".concat(e))}))}function a(e,t,n){(e.classList.contains("card__like-button_is-active")?r:o)(n._id).then((function(n){t.textContent=n.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log(e)}))}function u(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")})),document.addEventListener("keydown",s)}function l(e){e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated")}),100),document.removeEventListener("keydown",s)}function s(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&l(t)}}function d(e){e.target===e.currentTarget&&l(e.currentTarget)}var p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__error-visible"};function f(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o),r.textContent=""}var _=function(e){return e.some((function(e){return!e.validity.valid}))};function m(e,t){_(e)?(t.disabled=!0,t.classList.add(p.submitButtonSelector)):(t.disabled=!1,t.classList.remove(p.submitButtonSelector))}function y(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){f(e,n,t.inputErrorClass,t.errorClass)})),e.reset(),m(n,o)}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var h,S=document.querySelector(".places__list");function b(e,t){e.textContent=t}Promise.all([fetch("".concat(e,"/users/me"),{headers:{authorization:t}}).then(n),fetch("".concat(e,"/cards"),{headers:{authorization:t}}).then(n)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,i,a=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(a.push(o.value),a.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw r}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],u=o[1];h=r._id;var l=document.querySelector(".profile__image"),s=document.querySelector(".profile__title"),d=document.querySelector(".profile__description");l.style.backgroundImage='url("'.concat(r.avatar,'")'),s.textContent=r.name,d.textContent=r.about,u.forEach((function(e){var t=c(e,N,i,a,h);S.appendChild(t)}))})).catch((function(e){console.error("Ошибка при загрузке данных:",e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()}));var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);(function(e,t,n,o,r){var c=Array.from(e.querySelectorAll(t)),i=e.querySelector(n);c.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(e,t,o,r),m(c,i)}))}))})(t,e.inputSelector,e.submitButtonSelector,e.inputErrorClass,e.errorClass),m(n,o)}))}(p);var q=document.querySelector(".popup_type_edit"),k=document.querySelector(".profile__edit-button"),E=q.querySelector(".popup__close"),L=document.forms["edit-profile"],g=document.querySelector(".popup__input_type_name"),C=document.querySelector(".popup__input_type_description"),T=document.querySelector(".profile__title"),A=document.querySelector(".profile__description");k.addEventListener("click",(function(){u(q),y(L,p),g.value=T.textContent,C.value=A.textContent})),E.addEventListener("click",(function(){l(q)})),q.addEventListener("click",d),L.addEventListener("submit",(function(o){o.preventDefault();var r,c,i=g.value,a=C.value,u=q.querySelector(".popup__button");b(u,"Сохранение..."),(r=i,c=a,fetch("".concat(e,"/users/me"),{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:r,about:c})}).then(n)).then((function(e){T.textContent=e.name,A.textContent=e.about,l(q)})).catch((function(e){console.error("Ошибка при обновлении информации о пользователе:",e)})).finally((function(){b(u,"Сохранить")}))}));var x=document.querySelector(".popup_type_new-card"),j=x.querySelector(".popup__close"),w=document.querySelector(".profile__add-button"),z=document.forms["new-place"],O=document.querySelector(".popup__input_type_card-name"),B=document.querySelector(".popup__input_type_url");w.addEventListener("click",(function(){u(x),y(z,p)})),j.addEventListener("click",(function(){l(x)})),z.addEventListener("submit",(function(o){o.preventDefault();var r,u,s={name:O.value,link:B.value,likes:[]},d=x.querySelector(".popup__button");b(d,"Сохранение..."),(r=s.name,u=s.link,fetch("".concat(e,"/cards"),{method:"POST",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:r,link:u})}).then(n).then((function(e){return e}))).then((function(e){var t=c(e,N,i,a,h);S.prepend(t),l(x),z.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){b(d,"Сохранить")}))}));var I=document.querySelector(".popup_type_image"),D=I.querySelector(".popup__close"),P=I.querySelector(".popup__image"),M=I.querySelector(".popup__caption");function N(e){var t=e.querySelector(".card__image").src,n=e.querySelector(".card__image").alt;P.src=t,P.alt=n,M.textContent=n,u(I)}D.addEventListener("click",(function(){l(I)})),I.addEventListener("click",d);var J=document.querySelector(".profile__image"),H=document.querySelector(".popup_type_avatar"),U=H.querySelector(".popup__close"),V=document.forms["avatar-form"],$=document.querySelector(".popup__input_type_url");J.addEventListener("click",(function(){u(H),$.value="",y(V,p)})),U.addEventListener("click",(function(){l(H)})),H.addEventListener("click",d),V.addEventListener("submit",(function(t){t.preventDefault();var o,r=document.getElementById("avatar-link-input").value,c=H.querySelector(".popup__button");b(c,"Сохранение..."),(o=r,fetch("".concat(e,"/users/me/avatar"),{method:"PATCH",headers:{authorization:"ecf17080-347b-483b-a076-f4b38ef76ef6","Content-Type":"application/json"},body:JSON.stringify({avatar:o})}).then(n).then((function(e){return e}))).then((function(e){J.style.backgroundImage="url(".concat(e.avatar,")"),l(H)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)})).finally((function(){b(c,"Да")}))}))})();