let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.form');
let formToggle = document.querySelector('.form__toggle');

let submitButton = document.querySelector('.edit-form__button');
let inputName = document.querySelector('.edit-form__field_name');
let inputAbout = document.querySelector('.edit-form__field_about');
let profileName = document.querySelector('.profile__field-name');
let profileAbout = document.querySelector('.profile__field-about');

function popupOpen() {
    formElement.classList.add('form_active');
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
};
editButton.addEventListener('click', popupOpen);

function popupClose() {
    formElement.classList.remove('form_active');
};
formToggle.addEventListener('click', popupClose);




function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupClose();
}
formElement.addEventListener('submit', handleFormSubmit);