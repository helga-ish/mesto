import './pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards,
  cardGallery,
  inputAbout,
  inputCardName,
  inputLink,
  inputName,
  editButton,
  addButton,
  allSelectors
} from './constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// making card popup
const cardPopupPreview = new PopupWithImage('#popup-card');

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
  }, '.gallery__list');
  initialCardList.renderer();

// opening profile popup

  const profileFormPopup = new PopupWithForm(
    {
    popupSelector: '#popup-edit',
    handleFormSubmit: (object) => {
      userInfo.setUserInfo(object);
      profileFormPopup.closePopup();
    }
  });

  // filling form with user data
  const userInfo = new UserInfo(
    {
    userNameSelector: '.profile__field-name',
    userAboutSelector: '.profile__field-about'
  });

  editButton.addEventListener('click', () => {
    profileFormPopup.openPopup();
    const infoObj = userInfo.getUserInfo();
    inputName.value = infoObj.name;
    inputAbout.value = infoObj.about;
  });
  

// opening add card popup

const addCardPopup = new PopupWithForm({
  popupSelector: '#popup-add',
  handleFormSubmit: () => {
    const newCardObj = {
      name: inputCardName.value,
      link: inputLink.value,
    };
    const newCard = createCard(newCardObj);
    cardGallery.prepend(newCard);
    addCardPopup.closePopup()
  }
});
addButton.addEventListener('click', () => {
  addCardPopup.openPopup();
});


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
