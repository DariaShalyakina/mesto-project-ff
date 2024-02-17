const cohortId = "wff-cohort-6";

// Функция для изменения текста кнопки
function setSaveButtonText(text) {
    const saveButtons = document.querySelectorAll('.popup__button');
    saveButtons.forEach(button => {
        button.textContent = text;
    });
}

// Загрузка информации о пользователе с сервера
export function fetchUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/users/me`, {
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6'
        }
    })
        .then(res => res.json())
        .then(data => {
            const profileImage = document.querySelector('.profile__image');
            const profileTitle = document.querySelector('.profile__title');
            const profileDescription = document.querySelector('.profile__description');

            profileImage.style.backgroundImage = `url(${data.avatar})`;
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
        })
        .catch(error => {
            console.error("Ошибка при получении данных пользователя:", error);
        });
}

// Загрузка карточек с сервера
export function fetchCards() {
    const fetchPromise = fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/cards`, {
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6'
        }
    })
        .then(res => res.json())
        .then(cards => {
            return cards.map(card => {
                const data = {
                    ...card,
                    owner: {
                        ...card.owner
                    }
                };
                return data;
            });
        });

    return fetchPromise.catch(error => {
        console.error("Ошибка при получении карточек:", error);
    });
}

// Редактирование профиля
export function updateUserInfo(name, about) {

    // Изменяем текст кнопки на "Сохранение..."
    setSaveButtonText('Сохранение...');

    return fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(res => res.json())
        .then(data => {
            // Обработка успешного ответа от сервера
            // Возвращаем надпись на кнопке обратно
            setSaveButtonText('Сохранить');
            return data;
        })
        .catch(error => {
            // Обработка ошибки при обновлении данных пользователя
            console.error("Ошибка при обновлении данных пользователя:", error);
        });
}

//Добавление новой карточки
export function fetchAddNewCard(name, link) {

    // Изменяем текст кнопки на "Сохранение..."
    setSaveButtonText('Сохранение...');

    return fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/cards`, {
        method: "POST",
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => res.json())
        .then(data => {
            // Возвращаем надпись на кнопке обратно
            setSaveButtonText('Сохранить');
            return data;
        })
        .catch(error => {
            console.error("Ошибка при добавлении карточки:", error);
        });
}

//Удаление карточки
export function fetchDeleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch(error => {
            console.error('Ошибка при удалении карточки:', error);
        });
}

// Постановка и снятие лайка
// Постановка лайка
export function fetchLikeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
}

// Снятие лайка
export function fetchUnlikeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
}

//Обновление аватара пользователя
export function fetchUpdateAvatar(link) {

    // Изменяем текст кнопки на "Сохранение..."
    setSaveButtonText('Сохранение...');

    return fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: 'ecf17080-347b-483b-a076-f4b38ef76ef6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => {
            // Возвращаем надпись на кнопке обратно
            setSaveButtonText('Да');
            return data;
        })
        .catch(error => {
            // Обработка ошибки при обновлении данных пользователя
            console.error("Ошибка при обновлении аватара:", error);
        });
}
