
import '../styles/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { initialCards } from './cards.js';
import { openPopup, closePopup, handleClickOutside } from './modal.js';

// Добавление карточек на страницу
const placesList = document.querySelector('.places__list'); // место, где будут лежать карточки

// с помощью цикла проходимся по массиву, который содержит данные для карточек
initialCards.forEach(function (cardData) {
    const card = createCard(cardData, openImagePopup, deleteCard, likeCard);

    placesList.appendChild(card);
});

// Открытие, редактирование имени и информации о себе
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const editPopupCloseButton = editPopup.querySelector('.popup__close');
const editProfileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__description');

editButton.addEventListener('click', function () {
    openPopup(editPopup);
    fillEditFormInputs();
});

editPopupCloseButton.addEventListener('click', function () {
    closePopup(editPopup);
});

editPopup.addEventListener('click', handleClickOutside); // закрытие по оверлею

// при открытии отображение уже заполненной информации
function fillEditFormInputs() {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
}

// добавление новой информации
function handleEditFormSubmit(evt) {
    evt.preventDefault();

    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;

    closePopup(editPopup);
}

editProfileForm.addEventListener('submit', handleEditFormSubmit);

// Открытие формы и добавление новой карточки
const addPopup = document.querySelector('.popup_type_new-card');
const addPopupCloseButton = addPopup.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const addCard = document.forms['new-place'];
const name = document.querySelector('.popup__input_type_card-name');
const link = document.querySelector('.popup__input_type_url');

addButton.addEventListener('click', function () {
    openPopup(addPopup);
});

addPopupCloseButton.addEventListener('click', function () {
    closePopup(addPopup);
});

addPopup.addEventListener('click', handleClickOutside); // закрытие по оверлею

addCard.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const cardData = {
        name: name.value,
        link: link.value
    }; // создаем объект, содержащий значение полей

    const card = createCard(cardData, openImagePopup, deleteCard, likeCard);

    placesList.prepend(card); // карточка добавляется в начало контейнера

    closePopup(addPopup); // вызываем функцию закрытия карточки

    addCard.reset(); // сбрасываем значения полей формы
});

// Функция открытия попапа с картинкой
const popupImage = document.querySelector('.popup_type_image');
const closePopupImageButton = popupImage.querySelector('.popup__close');
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

closePopupImageButton.addEventListener('click', function () {
    closePopup(popupImage);
});

popupImage.addEventListener('click', handleClickOutside); // закрытие по оверлею
