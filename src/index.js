import './pages/index.css';
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
const cardPopupImage = document.querySelector('.popup-card__image');
const cardPopupHeading = document.querySelector('.popup-card__heading');



const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#popup-add');
const addForm = document.forms['addForm'];

const inputCardName = document.querySelector('.form__field_type_card-name');
const inputLink = document.querySelector('.form__field_type_link');

const cardGallery = document.querySelector('.gallery__list');

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
function handleCardClick(name, link) {
  openPopup(cardPopup);
  cardPopupImage.src = link;
  cardPopupImage.alt = name;
  cardPopupHeading.textContent = name;
};

function createCard(item) {
  const card = new Card(item, '#new-card', handleCardClick);
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
