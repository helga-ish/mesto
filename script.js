let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.form');
let formToggle = document.querySelector('.form__toggle');

function popupOpen() {
    formElement.classList.add('form_active');
};
editButton.addEventListener('click', popupOpen);

function popupClose() {
    formElement.classList.remove('form_active');
};
formToggle.addEventListener('click', popupClose);
