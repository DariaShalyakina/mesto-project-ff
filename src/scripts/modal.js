//Работа модальных окон
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

//функция открытия попапа 
export function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(function () {
        popup.classList.add('popup_is-opened');
    });
}

//функция закрытия 
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    setTimeout(function () {
        popup.classList.remove('popup_is-animated');
    }, 100);
}

//закрытие по оверлею
function handleClickOutside(event) {
    popups.forEach(popup => {
        if (event.target === popup) {
            closePopup(popup);
        }
    });
}

//закрытие по крестику
function handleCloseButtonClick(event) {
    closePopup(event.target.closest('.popup'));
}

//закрытие по кнопке 'ESC'
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        popups.forEach(popup => {
            closePopup(popup);
        });
    }
}

popups.forEach(popup => {
    popup.addEventListener('click', handleClickOutside);
});

closeButtons.forEach(button => {
    button.addEventListener('click', handleCloseButtonClick);
});

window.addEventListener('keydown', handleEscapeKey);