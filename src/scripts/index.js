import '../styles/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openPopup, closePopup, handleClickOutside } from './modal.js';
import { validationSettings } from './validationConfig.js';
import { enableValidation, clearValidation } from './validation.js';
import { fetchUserInfo, fetchCards, updateUserInfo, fetchAddNewCard, fetchUpdateAvatar } from './api.js';

// Добавление карточек на страницу
const placesList = document.querySelector('.places__list'); // место, где будут лежать карточки

// Загрузка информации о пользователе с сервера и получение данных о карточках
let userId;
Promise.all([fetchUserInfo(), fetchCards()])
    .then(([userData, cards]) => {
        userId = userData._id;

        const profileImage = document.querySelector('.profile__image');
        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');

        profileImage.style.backgroundImage = `url("${userData.avatar}")`;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;

        cards.forEach(cardData => {
            const card = createCard(cardData, openImagePopup, deleteCard, likeCard, userId);
            placesList.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
    });

// Функция для изменения текста кнопки
function setSaveButtonText(button, text) {
    button.textContent = text;
}

//Валидация полей
enableValidation(validationSettings);

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
    clearValidation(editProfileForm, validationSettings);
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

    const newUsername = nameInput.value;
    const newAbout = jobInput.value;

    const saveEditFormButton = editPopup.querySelector('.popup__button'); // Получение кнопки сохранения формы редактирования профиля

    setSaveButtonText(saveEditFormButton, "Сохранение..."); // Изменение текста кнопки сохранения на "Сохранение..."

    updateUserInfo(newUsername, newAbout)
        .then((res) => {
            nameOutput.textContent = res.name;
            jobOutput.textContent = res.about;

            closePopup(editPopup);
        })
        .catch((err) => {
            console.error("Ошибка при обновлении информации о пользователе:", err);
        })
        .finally(() => {
            setSaveButtonText(saveEditFormButton, "Сохранить"); // Изменение текста кнопки сохранения обратно на "Сохранить"
        });
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
    clearValidation(addCard, validationSettings);
});

addPopupCloseButton.addEventListener('click', function () {
    closePopup(addPopup);
});

// Добавление новой карточки
addCard.addEventListener('submit', function (event) {
    event.preventDefault();

    const cardData = {
        name: name.value,
        link: link.value,
        likes: []
    }; // Создаем объект, содержащий значения полей

    const saveAddCardButton = addPopup.querySelector('.popup__button');

    setSaveButtonText(saveAddCardButton, "Сохранение..."); // Изменение текста кнопки сохранения на "Сохранение..."

    fetchAddNewCard(cardData.name, cardData.link)
        .then(data => {
            const card = createCard(data, openImagePopup, deleteCard, likeCard, userId);

            placesList.prepend(card); // Карточка добавляется в начало контейнера

            closePopup(addPopup); // Закрываем попап

            addCard.reset(); // Сбрасываем значения полей формы
        })
        .catch(error => {
            console.error("Ошибка при добавлении карточки:", error);
        })
        .finally(() => {
            setSaveButtonText(saveAddCardButton, "Сохранить"); // Изменение текста кнопки сохранения обратно на "Сохранить"
        });
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

//Попап смены аватара 
const profileImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const closeAvatarPopup = avatarPopup.querySelector('.popup__close');
const avatarForm = document.forms['avatar-form'];
const avatarInput = document.querySelector('.popup__input_type_url');

profileImage.addEventListener('click', function () {
    openPopup(avatarPopup);
    avatarInput.value = ''; // Очищаем поле ввода при открытии попапа
    clearValidation(avatarForm, validationSettings);
});

closeAvatarPopup.addEventListener('click', function () {
    closePopup(avatarPopup);
});

avatarPopup.addEventListener('click', handleClickOutside); // закрытие по оверлею

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const avatarLink = document.getElementById('avatar-link-input').value;

    const saveAvatarFormButton = avatarPopup.querySelector('.popup__button');

    setSaveButtonText(saveAvatarFormButton, "Сохранение...");

    fetchUpdateAvatar(avatarLink)
        .then((res) => {
            profileImage.style.backgroundImage = `url(${res.avatar})`;
            closePopup(avatarPopup);
        })
        .catch((err) => {
            console.error("Ошибка при обновлении аватара:", err);
        })
        .finally(() => {
            setSaveButtonText(saveAvatarFormButton, "Да"); // Изменение текста кнопки сохранения обратно на "Сохранить"
        });
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);