let editButton = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let popupToggle = document.querySelector('.popup__toggle');

let submitButton = document.querySelector('.edit-form__button');
let inputName = document.querySelector('.edit-form__field_name');
let inputAbout = document.querySelector('.edit-form__field_about');
let profileName = document.querySelector('.profile__field-name');
let profileAbout = document.querySelector('.profile__field-about');

let editForm = document.querySelector('.edit-form');

function popupOpen() {
    popupElement.classList.add('popup_active');
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
};
editButton.addEventListener('click', popupOpen);

function popupClose() {
    popupElement.classList.remove('popup_active');
};
popupToggle.addEventListener('click', popupClose);




function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupClose();
}
editForm.addEventListener('submit', handleFormSubmit);