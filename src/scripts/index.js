// import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards,
  cardGallery,
  cardPopup,
  cardPopupHeading,
  cardPopupImage,
  inputAbout,
  inputCardName,
  inputLink,
  inputName,
  editButton,
  editPopup,
  editForm,
  addButton,
  addForm,
  addPopup,
  profileAbout,
  profileName,
} from './utils/constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';


// open edit popup
function openEditPopup() {
    formValidators['editForm'].resetValidation();
    openPopup(editPopup);
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
};
editButton.addEventListener('click', openEditPopup);

// edit form submit
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(editPopup);
}
editForm.addEventListener('submit', handleProfileFormSubmit);

// initial cards
// const handleCardClick = () => {
//   cardPopupPreview.openPopup();
//   // cardPopupImage.src = link;
//   // cardPopupImage.alt = name;
//   // cardPopupHeading.textContent = name;
// };

const cardPopupPreview = new PopupWithImage(cardPopup);


function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (link, name) => {
      cardPopupPreview.openPopup(link, name);
    }
  }, '#new-card');
  const cardItem = card.generateCard();
  return cardItem;
}

const initialCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      initialCardList.addItem(cardElement);
    }
  }, cardGallery);
  initialCardList.renderer();

// add new card button:
function handleAddFormSubmit (evt) {
    evt.preventDefault();
    const newCardObj = {
      name: inputCardName.value,
      link: inputLink.value,
    };
    const cardElement = createCard(newCardObj);
    cardGallery.prepend(cardElement); 
    closePopup(addPopup);
    formValidators['addForm'].resetValidation();
    addForm.reset();
};
addForm.addEventListener('submit', handleAddFormSubmit);

// open and close addPopup:
function openAddPopup() {
    formValidators['addForm'].resetValidation();
    openPopup(addPopup);
};
addButton.addEventListener('click', openAddPopup);

// close all popups with escape and overlay click
// const popupList = document.querySelectorAll('.popup');
// popupList.forEach(popup => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_active')) {
//       closePopup(popup);
//     };
//     if(evt.target.classList.contains('popup__toggle')) {
//       closePopup(popup);
//     };
//   });
// });


const allSelectors = {
  formSelector: '.form',
  formFieldsetSelector: '.form__fields',
  formFieldSelector: '.form__field',
  buttonSelector: '.form-button',
  inactiveButtonClass: 'form-button_inactive',
  activeErrorClass: 'form__field-error_active',
  formFieldTypeErrorClass: 'form__field_type_error',
};

// validate forms
const formValidators = {};
const enableValidation = (allSelectors) => {
  const formList = Array.from(document.querySelectorAll(allSelectors.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(allSelectors, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
});
};
enableValidation(allSelectors);
