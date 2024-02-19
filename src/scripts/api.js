const cohortId = "wff-cohort-6";
const baseUrl = `https://mesto.nomoreparties.co/v1/${cohortId}`;
const authorization = 'ecf17080-347b-483b-a076-f4b38ef76ef6';

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка информации о пользователе с сервера
export function fetchUserInfo() {
    return fetch(`${baseUrl}/users/me`, {
        headers: {
            authorization
        }
    })
        .then(handleResponse);
}

// Загрузка карточек с сервера
export function fetchCards() {
    return fetch(`${baseUrl}/cards`, {
        headers: {
            authorization
        }
    })
        .then(handleResponse);
}

// Редактирование профиля
export function updateUserInfo(name, about) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(handleResponse);
}

//Добавление новой карточки
export function fetchAddNewCard(name, link) {
    return fetch(`${baseUrl}/cards`, {
        method: "POST",
        headers: {
            authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

//Удаление карточки
export function fetchDeleteCard(cardId) {
    return fetch(`${baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization,
            'Content-Type': 'application/json'
        }
    })
    .then(handleResponse);
}

// Постановка и снятие лайка
// Постановка лайка
export function fetchLikeCard(cardId) {
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization,
            'Content-Type': 'application/json'
        }
    })
    .then(handleResponse);
}

// Снятие лайка
export function fetchUnlikeCard(cardId) {
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization,
            'Content-Type': 'application/json'
        }
    })
    .then(handleResponse);
}

//Обновление аватара пользователя
export function fetchUpdateAvatar(link) {

    return fetch(`${baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(handleResponse)
        .then(data => {
            return data;
        });
}
