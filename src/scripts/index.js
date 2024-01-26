
import '../styles/index.css';
import { createCard } from './card.js';
import { initialCards } from './cards.js';
import { openPopup, closePopup } from './modal.js';

//Добавление карточек на страницу
const placesList = document.querySelector('.places__list'); //место где будут лежать карточки

// с помощью цикла проходимся по массиву который содержит данные для карточек
initialCards.forEach(function (cardData) {
    const card = createCard(cardData, openImagePopup);

    placesList.appendChild(card); //добавляем карточку 
});

//Открытие, редактирование имени и информации о себе
const editButton = document.querySelector('.profile__edit-button');
const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__description');

editButton.addEventListener('click', function () {
    openPopup(document.querySelector('.popup_type_edit'));
    fillFormInputs();
});

//при открытии отображение уже заполненной информации
function fillFormInputs() {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
}

//добавление новой информации 
function handleFormSubmit(evt) {
    evt.preventDefault();

    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;

    closePopup(document.querySelector('.popup_type_edit'));
}

formElement.addEventListener('submit', handleFormSubmit);

//Открытие формы и добавление новой карточки
const addButton = document.querySelector('.profile__add-button');
const addCard = document.forms['new-place'];
const name = document.querySelector('.popup__input_type_card-name');
const link = document.querySelector('.popup__input_type_url');

addButton.addEventListener('click', function () {
    openPopup(document.querySelector('.popup_type_new-card'));
})

addCard.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const cardData = {
        name: name.value,
        link: link.value
    }; //создаем объект содержащий значение полей

    const card = createCard(cardData);

    placesList.prepend(card); //карточка добаляется в начало контейнера

    closePopup(document.querySelector('.popup_type_new-card')); //вызываем функцию закрытия карточки 

    addCard.reset(); //сбрасываем значения полей формы 
});

//Функция открытия попапа с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageFullImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

function openImagePopup(cardElement) {
    const imageUrl = cardElement.querySelector('.card__image').src;
    const imageAlt = cardElement.querySelector('.card__image').alt;

    popupImageFullImage.src = imageUrl;
    popupImageFullImage.alt = imageAlt;
    popupImageCaption.textContent = imageAlt;

    openPopup(popupImage);
}


