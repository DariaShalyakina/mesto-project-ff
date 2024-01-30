//создание карточек, удаление и лайк 

export function createCard(data, openImagePopup, deleteCard, likeCard) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    // Находим элементы внутри карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    // Значения атрибутов и текстовое содержимое
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    // обработчик события по клику на кнопку удаления
    deleteButton.addEventListener('click', function () {
        deleteCard(cardElement);
    });

    // обработчик события на кнопку лайка
    likeButton.addEventListener('click', function () {
        likeCard(likeButton);
    });

    // открытие попапа с картинкой
    cardImage.addEventListener('click', function () {
        openImagePopup(cardElement);
    });

    return cardElement;
}

export function deleteCard (cardElement) {
    cardElement.remove();
}

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}


