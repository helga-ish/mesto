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
  allSelectors
} from '../components/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteConfirmation from '../components/PopupWithDeleteConfirmation.js';
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

// creating card, opening card, deleting card + api request
function createCard(item) {
  const card = new Card({
    data: item,
    userId: 'e26556018c08b7b7d796fcb0',
    handleCardClick: (name, link) => {
      cardPopupPreview.openPopup(name, link);
    },
    handleCardDeleteIcon: () => {
      deleteCardConfirmationPopup.openPopup();
      deleteCardConfirmationPopup.handleDeleteSubmit(() => {
        api.deleteCard(item._id)
        .then(() => {
          card.handleRemoveCard(true);
        })
        .catch(err => console.log(`Ошибка удаления карточки: ${err}`));
        deleteCardConfirmationPopup.closePopup();
      })
    },
    handleLikeToggle: () => {
      api.changeLikeStatus(item._id, !card.isLiked())
      .then((data) => {
        console.log(data);
        item.likes.length = data.likes.length;
        card.showLikesQuantity();
      })
      .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`));
    }
  }, '#new-card');
  const cardItem = card.generateCard();
  return cardItem;
}

// opening confirmation to delete card
const deleteCardConfirmationPopup = new PopupWithDeleteConfirmation('#popup-delete-card');
deleteCardConfirmationPopup.setEventListeners();

// opening avatar popup, filling avatar, sending api request
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
      .catch(err => console.log(`Ошибка изменения аватара: ${err}`))
      .finally(() => avatarFormPopup.renderLoading(false, 'Сохранить'));
    }
  }
);
avatarFormPopup.setEventListeners();
editAvatarButton.addEventListener('click', () => {
  avatarFormPopup.openPopup();
  formValidators['editAvatarForm'].resetValidation();
});

// opening profile popup, filling profile, sending api request

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
      .catch(err => console.log(`Ошибка изменения данных профиля: ${err}`))
      .finally(() => profileFormPopup.renderLoading(false, 'Сохранить'));
    }
  });
  profileFormPopup.setEventListeners();

  // filling form with user data
  const userInfo = new UserInfo(
    {
    userName: '.profile__field-name',
    userAbout: '.profile__field-about',
    userAvatar: '.profile__avatar',
  });

  editButton.addEventListener('click', () => {
    profileFormPopup.openPopup();
    formValidators['editForm'].resetValidation();
    const infoObj = userInfo.getUserInfo();
    inputName.value = infoObj.name;
    inputAbout.value = infoObj.about;
  });
  

// opening add card popup, adding card, sending api request

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
          .catch(err => console.log(`Ошибка добавления новой карточки: ${err}`))
          .finally(() => addCardPopup.renderLoading(false, 'Отправить'));
        }
      }, '.gallery__list');
      newCards.renderer();
    addCardPopup.closePopup()
  },
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
.catch(err => console.log(`Ошибка загрузки карточек с сервера: ${err}`));

// showing profile info
const profileUserInfo = api.getProfileUserInfo();
profileUserInfo
.then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data)
})
.catch(err => console.log(`Ошибка загрузки данных пользователя с сервера: ${err}`));


