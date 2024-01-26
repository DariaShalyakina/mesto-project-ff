//создание карточек, удаление и лайк 
function deleteCard(cardElement) {
    cardElement.remove();
}

export function createCard(data, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    //Находим элементы внутри карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    //Значения атрибутов и текстовое содержимое
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    //обработчик события по клику на кнопку удаления
    deleteButton.addEventListener('click', function () {
        deleteCard(cardElement);
    });

    //обработчик события на кнопку лайка
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    //открытие попапа с картинкой
    cardImage.addEventListener('click', function () {
        openImagePopup(cardElement);
    });

    return cardElement;
}


