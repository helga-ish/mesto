import './index.css';
import Api from '../components/api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  inputAbout,
  inputName,
  editButton,
  addButton,
  editAvatarButton,
  deleteCardButton,
  allSelectors
} from '../components/constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
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
    },
    handleCardDeleteIcon: () => {
      deleteCardConfirmationPopup.openPopup();
      
    }
  }, '#new-card');
  const cardItem = card.generateCard();
  return cardItem;
}

// opening confirmation to delete card
const deleteCardConfirmationPopup = new Popup('#popup-delete-card');
deleteCardConfirmationPopup.setEventListeners();


// opening avatar popup
const avatarFormPopup = new PopupWithForm(
  {
    popupElement: '#popup-avatar-edit',
    handleFormSubmit: (object) => {
      userInfo.setUserAvatar(object);
      avatarFormPopup.closePopup();
      api.editAvatar(object)
      .then((data) => {
      userInfo.setUserAvatar(data);
      })
      .catch(err => console.log(err))
    }
  }
);
avatarFormPopup.setEventListeners();
editAvatarButton.addEventListener('click', () => {
  avatarFormPopup.openPopup();
  formValidators['editAvatarForm'].resetValidation();
});

// opening profile popup

  const profileFormPopup = new PopupWithForm(
    {
    popupElement: '#popup-edit',
    handleFormSubmit: (object) => {
      userInfo.setUserInfo(object);
      profileFormPopup.closePopup();
      api.changeProfileUserInfo(object)
      .then((data) => {
      userInfo.setUserInfo(data);
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
          api.addCard(item)
          .then((item) => {
            const cardElement = createCard(item);
            newCards.addItem(cardElement);
          })
          .catch(err => console.log(err))
        }
      }, '.gallery__list');
      newCards.renderer();
    addCardPopup.closePopup()
  },
  changeInfo: () => {
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

