// Работа модальных окон
// функция открытия модального окна
export function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(function () {
        popup.classList.add('popup_is-opened');
    });
    document.addEventListener('keydown', handleEscapeKey);
}

// функция закрытия модального окна
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    setTimeout(function () {
        popup.classList.remove('popup_is-animated');
    }, 100);
    document.removeEventListener('keydown', handleEscapeKey);
}

// функция-обработчик события нажатия Esc
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// функция-обработчик события клика по оверлею
export function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
}