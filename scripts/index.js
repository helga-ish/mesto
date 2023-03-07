import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// initial cards: 
const initialCards = [
    {
      name: 'Стамбул',
      link: 'https://images.unsplash.com/photo-1567527259232-3a7fcd490c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
      name: 'Куала-Лумпур',
      link: 'https://images.unsplash.com/photo-1508062878650-88b52897f298?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80'
    },
    {
      name: 'Порвоо',
      link: 'https://images.unsplash.com/photo-1642804256897-5b0180604848?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
    },
    {
      name: 'Стокгольм',
      link: 'https://images.unsplash.com/photo-1596636478939-59fed7a083f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
      name: 'Сванетия',
      link: 'https://images.unsplash.com/photo-1569498283068-140e58143192?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    },
    {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80'
    }
  ];

// initialisation:
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__field-name');
const profileAbout = document.querySelector('.profile__field-about');

const editPopup = document.querySelector('#popup-edit');
const editForm = document.forms['editForm'];

const inputName = document.querySelector('.form__field_type_name');
const inputAbout = document.querySelector('.form__field_type_about');


const cardPopup = document.querySelector('#popup-card');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#popup-add');
const addForm = document.forms['addForm'];
const addFormButton = addForm.querySelector('.form-button');

const inputCardName = document.querySelector('.form__field_type_card-name');
const inputLink = document.querySelector('.form__field_type_link');

const cardGallery = document.querySelector('.gallery__list');

const cardPopupImage = cardPopup.querySelector('.popup-card__image');
const cardPopupHeading = cardPopup.querySelector('.popup-card__heading');

// function for opening and closing popups
function openPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closePopupEscape);
};
function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closePopupEscape);
};

// open edit popup
function openEditPopup() {
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
function createCard(item) {
  const card = new Card(item, '#new-card');
  const cardItem = card.generateCard();
  return cardItem;
}

initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardGallery.append(cardElement);
});

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
    addForm.reset(); 
};
addForm.addEventListener('submit', handleAddFormSubmit);

// open and close addPopup:
function openAddPopup() {
    addFormButton.disabled = true;
    addFormButton.classList.add('form-button_inactive');
    openPopup(addPopup);
};
addButton.addEventListener('click', openAddPopup);

// close all popups with escape and overlay click
const popupList = document.querySelectorAll('.popup');
popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_active')) {
      closePopup(popup);
    };
    if(evt.target.classList.contains('popup__toggle')) {
      closePopup(popup);
    };
  });
});

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_active'));
  };
};

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
const formLists = document.querySelectorAll('.form');
formLists.forEach((form) => {
  const validator = new FormValidator(allSelectors, form);
  validator.enableValidation();
});

export { openPopup, cardPopup, cardPopupHeading, cardPopupImage };





// // add new card function
// let cardElement;

// function createNewCard(link, name) {
//     cardElement = cardTemplate.cloneNode(true);

//     const cardElementImage = cardElement.querySelector('.card__image');
//     cardElement.querySelector('.card__name').textContent = name;
//     cardElementImage.src = link;
//     cardElementImage.alt = name;

//     // put like:
//     const likeNewButton = cardElement.querySelector('.card__like');
//     likeNewButton.addEventListener('click', (event) => {
//         event.target.classList.toggle("card__like_active");
//     });
//     // remove card:
//     const removeNewButton = cardElement.querySelector('.card__remove');
//     removeNewButton.addEventListener('click', function() {
//         this.parentNode.remove();
//     });
//     // open new card popup:
//     cardElementImage.addEventListener('click', function(event) {
//         openPopup(cardPopup);
//         cardPopupImage.src = event.target.src;
//         cardPopupImage.alt = event.target.alt;
//         cardPopupHeading.textContent = event.target.alt;
//     });

//     return cardElement;
// };

// //showing 6 initial cards:
//   initialCards.forEach(function (element) {
//     createNewCard(element.link, element.name);
//     cardGallery.append(cardElement);
//   });