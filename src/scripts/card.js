import { fetchDeleteCard, fetchLikeCard, fetchUnlikeCard } from "./api.js";

// Создание карточки
export function createCard(data, openImagePopup, deleteCard, likeCard, userId) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    // Находим элементы внутри карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCountElement = cardElement.querySelector('.card__like-count');
    cardElement.dataset.cardId = data._id;

    // Значения атрибутов и текстовое содержимое
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    likeCountElement.textContent = data.likes.length;

    // Проверяем, является ли владелец карточки текущим пользователем
    if (data.owner && data.owner._id === userId) {
        deleteButton.style.display = 'block';

        // Удаление
        deleteButton.addEventListener('click', function () {
            deleteCard(cardElement, data);
        });
    } else {
        deleteButton.style.display = 'none';
    }

    // лайки
    // Проверка статуса лайка
    if (data.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    //постановка лайков
    likeButton.addEventListener('click', function () {
        likeCard(likeButton, likeCountElement, data);
    });

    // открытие попапа с картинкой
    cardImage.addEventListener('click', function () {
        openImagePopup(cardElement);
    });

    return cardElement;
}

//функция удаления карточки  
export function deleteCard(cardElement, data) {
    fetchDeleteCard(data._id)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

// Функция лайка карточки
export function likeCard(likeButton, likeCountElement, data) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        fetchUnlikeCard(data._id)
            .then(() => {
                likeButton.classList.remove('card__like-button_is-active');
                likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    } else {
        fetchLikeCard(data._id)
            .then(() => {
                likeButton.classList.add('card__like-button_is-active');
                likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }
}

