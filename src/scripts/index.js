
import '../styles/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openPopup, closePopup, handleClickOutside } from './modal.js';
import { enableValidation, clearValidation, validationSettings } from './validation.js';
import { fetchUserInfo, fetchCards, updateUserInfo, fetchAddNewCard, fetchUpdateAvatar } from './api.js';

// Добавление карточек на страницу
const placesList = document.querySelector('.places__list'); // место, где будут лежать карточки
const userId = 'e14e130542e11349806adb20'; //мой индентификатор 

// Загрузка информации о пользователе с сервера
const fetchUserInfoPromise = fetchUserInfo();

// Получение данных о карточках
const fetchCardsPromise = fetchCards()
    .then(cards => {
        const cardPromises = cards.map(cardData => {
            return new Promise(resolve => {
                const card = createCard(cardData, openImagePopup, deleteCard, likeCard, userId);
                placesList.appendChild(card);
                resolve();
            });
        });

        return Promise.all(cardPromises);
    });

Promise.all([fetchUserInfoPromise, fetchCardsPromise])
    .then(() => {
        // Все карточки добавлены и информация о пользователе загружена
    })
    .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
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
    clearValidation(editProfileForm, validationSettings);
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

    const newName = nameInput.value;
    const newAbout = jobInput.value;

    updateUserInfo(newName, newAbout);

    nameOutput.textContent = newName;
    jobOutput.textContent = newAbout;

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
    clearValidation(addCard, validationSettings);
    addCard.reset();
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

    fetchAddNewCard(cardData.name, cardData.link)
        .then(data => {
            cardData._id = data._id; // Добавляем идентификатор карточки
            const card = createCard(cardData, openImagePopup, deleteCard, likeCard, userId);

            placesList.prepend(card); // Карточка добавляется в начало контейнера

            closePopup(addPopup); // Закрываем попап

            addCard.reset(); // Сбрасываем значения полей формы

            // Добавляем обработчики событий после добавления карточки в DOM
            const deleteButton = card.querySelector('.card__delete-button');
            const likeButton = card.querySelector('.card__like-button');
            const likeCountElement = card.querySelector('.card__like-count');

            // Удаление
            // Проверяем, является ли владелец карточки текущим пользователем
            if (data.owner && data.owner._id === userId) {
                deleteButton.style.display = 'block';

                // Удаляем
                deleteButton.addEventListener('click', function () {
                    deleteCard(card, data);
                });
            } else {
                deleteButton.style.display = 'none';
            }

            // Лайки
            likeButton.addEventListener('click', function () {
                if (!data.likes.some(like => like._id === userId)) {
                    likeCard(likeButton, likeCountElement, data);
                }
            });
        })
        .catch(error => {
            console.error("Ошибка при добавлении карточки:", error);
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

    fetchUpdateAvatar(avatarLink); // Вызов функции для обновления аватара на сервере

    // Обновление изображения на странице
    profileImage.style.backgroundImage = `url(${avatarLink})`;

    closePopup(avatarPopup);
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);


//Валидация полей
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-visible'
});

