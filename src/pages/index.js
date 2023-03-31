import './index.css';
import Api from '../components/api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  inputAbout,
  inputName,
  editButton,
  addButton,
  allSelectors
} from '../components/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62/',
  headers: {
    Authorization: '4471ba4a-88e3-4225-a99c-10facf8d16dd',
    'content-type': 'application/json'
  }
})

// making card popup
const cardPopupPreview = new PopupWithImage('#popup-card');
cardPopupPreview.setEventListeners();

// creating card
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      cardPopupPreview.openPopup(name, link);
    }
  }, '#new-card');
  const cardItem = card.generateCard();
  return cardItem;
}

// opening profile popup

  const profileFormPopup = new PopupWithForm(
    {
    popupElement: '#popup-edit',
    handleFormSubmit: (object) => {
      userInfo.setUserInfo(object);
      profileFormPopup.closePopup();
    },
    changeInfo: (data) => {
      api.changeProfileUserInfo(data)
      .then((data) => {
      userInfo.setUserInfo(data);
      console.log(data);
      })
      .catch(err => console.log(err))
    }
  });
  profileFormPopup.setEventListeners();

  // filling form with user data
  const userInfo = new UserInfo(
    {
    userName: '.profile__field-name',
    userAbout: '.profile__field-about',
    userAvatar: '.profile__avatar'
  });

  editButton.addEventListener('click', () => {
    profileFormPopup.openPopup();
    formValidators['editForm'].resetValidation();
    const infoObj = userInfo.getUserInfo();
    inputName.value = infoObj.name;
    inputAbout.value = infoObj.about;
  });
  

// opening add card popup

const addCardPopup = new PopupWithForm({
  popupElement: '#popup-add',
  handleFormSubmit: (object) => {
    formValidators['addForm'].resetValidation();
    const newCards = new Section(
      {
        items: [{
          name: object.inputCardName,
          link: object.inputLink
        }],
        renderer: (item) => {
          const cardElement = createCard(item);
          newCards.addItem(cardElement);
        }
      }, '.gallery__list');
      newCards.renderer();
    addCardPopup.closePopup()
  }
});
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  addCardPopup.openPopup();
  formValidators['addForm'].resetValidation();
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


// showing initial cards

const initialCardItems = api.getInitialCards();
initialCardItems
.then((data) => {
  const initialCardList = new Section(
    {
      items: data,
      renderer: (item) => {
        const cardElement = createCard(item);
        initialCardList.addItem(cardElement);
      },
    }, '.gallery__list');
    initialCardList.renderer();
})
.catch(err => alert(err));

// showing profile info
const profileUserInfo = api.getProfileUserInfo();
profileUserInfo
.then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data)
})
.catch(err => alert(err));

// changing profile info

