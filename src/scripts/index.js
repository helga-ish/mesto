// import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards,
  cardGallery,
  cardPopup,
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
  allSelectors
} from './utils/constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

// making card popup
const cardPopupPreview = new PopupWithImage(cardPopup);

// creating card
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

// showing initial cards
const initialCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      initialCardList.addItem(cardElement);
    }
  }, cardGallery);
  initialCardList.renderer();

// opening profile popup

  const profileFormPopup = new PopupWithForm(
    {
    popupSelector: editPopup,
    handleFormSubmit: () => {
      profileName.textContent = inputName.value;
      profileAbout.textContent = inputAbout.value;
    }
  });

  editButton.addEventListener('click', () => {
    profileFormPopup.openPopup();
  });
  

// opening add card popup

const addCardPopup = new PopupWithForm({
  popupSelector: addPopup,
  handleFormSubmit: () => {
    const newCardObj = {
      name: inputCardName.value,
      link: inputLink.value,
    };
    const cardElement = createCard(newCardObj);
    cardGallery.prepend(cardElement);
    console.log(cardElement);
  }
});
addButton.addEventListener('click', () => {
  addCardPopup.openPopup();
});




// open edit popup
// function openEditPopup() {
//     formValidators['editForm'].resetValidation();
//     openPopup(editPopup);
//     inputName.value = profileName.textContent;
//     inputAbout.value = profileAbout.textContent;
// };
// editButton.addEventListener('click', openEditPopup);

// edit form submit
// function handleProfileFormSubmit (evt) {
//     evt.preventDefault();
//     profileName.textContent = inputName.value;
//     profileAbout.textContent = inputAbout.value;
//     closePopup(editPopup);
// }
// editForm.addEventListener('submit', handleProfileFormSubmit);

// add new card button:
// function handleAddFormSubmit (evt) {
//     evt.preventDefault();
//     const newCardObj = {
//       name: inputCardName.value,
//       link: inputLink.value,
//     };
//     const cardElement = createCard(newCardObj);
//     cardGallery.prepend(cardElement); 
//     closePopup(addPopup);
//     formValidators['addForm'].resetValidation();
//     addForm.reset();
// };
// addForm.addEventListener('submit', handleAddFormSubmit);

// open and close addPopup:
// function openAddPopup() {
//     formValidators['addForm'].resetValidation();
//     openPopup(addPopup);
// };
// addButton.addEventListener('click', openAddPopup);

// validate forms
export const formValidators = {};
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
