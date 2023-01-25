let editButton = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let popupToggle = document.querySelector('.popup__toggle');

let submitButton = document.querySelector('.edit-form__button');
let inputName = document.querySelector('.edit-form__field_type_name');
let inputAbout = document.querySelector('.edit-form__field_type_about');
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

//showing 6 initial cards:

let cardTemplate = document.querySelector('#new-card').content;
let cardGallery = document.querySelector('.gallery__list');

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

  initialCards.forEach(function (element) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__name').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardGallery.append(cardElement);
  });

// open and close addPopup:

let addButton = document.querySelector('.profile__add-button');
let addPopupElement = document.querySelector('.add-popup');
let addPopupToggle = document.querySelector('.add-popup__toggle');

let submitAddButton = document.querySelector('.add-form__button');
let inputCardName = document.querySelector('.add-form__field_type_card-name');
let inputLink = document.querySelector('.add-form__field_type_link');

let addForm = document.querySelector('.add-form');

function openAddPopup() {
    addPopupElement.classList.add('add-popup_active');
    inputCardName.value = "Название";
    inputLink.value = "Ссылка на картинку";
};
addButton.addEventListener('click', openAddPopup);

function closeAddPopup() {
    addPopupElement.classList.remove('add-popup_active');
};
addPopupToggle.addEventListener('click', closeAddPopup);

// add new card button:

let cardPopupToggle = document.querySelector('.card-popup__toggle');
let cardPopup = document.querySelector('.card-popup');

function handleAddFormSubmit (evt) {
    evt.preventDefault();
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = inputLink.value;
    cardElement.querySelector('.card__name').textContent = inputCardName.value;
    cardGallery.prepend(cardElement); 
    closeAddPopup();
    const likeNewButton = cardElement.querySelector('.card__like');
    likeNewButton.addEventListener('click', (event) => {
        event.target.classList.toggle("card__like_active");
    });
    const removeNewButton = cardElement.querySelector('.card__remove');
    removeNewButton.addEventListener('click', function() {
        cardElement.remove();
    });
    const cardElementImage = cardElement.querySelector('.card__image');
    cardElementImage.addEventListener('click', function() {
        cardPopup.classList.add('card-popup_active');
        cardPopupToggle.addEventListener('click', function() {
            cardPopup.classList.remove('card-popup_active');
        });
        cardPopup.querySelector('.card-popup__image').src = cardElement.querySelector('.card__image').src;
        cardPopup.querySelector('.card-popup__heading').textContent = cardElement.querySelector('.card__name').textContent;
    });
};
addForm.addEventListener('submit', handleAddFormSubmit);

// put like:

const likeInitialButtons = document.querySelectorAll('.card__like');
likeInitialButtons.forEach(like => {
    like.addEventListener("click", (event) => {
        event.target.classList.toggle("card__like_active");
    });
});

// remove card:

const cardRemove = document.querySelectorAll('.card__remove');
cardRemove.forEach(trash => {
    trash.addEventListener("click", function() {
        const cardItem = document.querySelector('.card');
        cardItem.remove();
    });
});

// popup card:

const cardItem = document.querySelectorAll('.card');
cardItem.forEach((item) => {
    const cardImage = document.querySelectorAll('.card__image');
    const cardName = document.querySelectorAll('.card__name');

        cardImage.forEach(image => {
        image.addEventListener('click', function() {
            cardPopup.classList.add('card-popup_active');
            cardPopup.querySelector('.card-popup__image').src = image.src;
            cardPopup.querySelector('.card-popup__heading').textContent = cardName.textContent;
            });
        });
    cardPopupToggle.addEventListener('click', function() {
        cardPopup.classList.remove('card-popup_active');
    });

});

// const cardImage = document.querySelectorAll('.card__image');
// cardImage.forEach(img => {
//     let cardPopupImageLink = document.querySelector('.card-popup__image');
//     let cardPopupImageName = document.querySelector('.card-popup__heading');
//     let cardPopupToggle = document.querySelector('.card-popup__toggle');
//     let cardPopup = document.querySelector('.card-popup');
//     const cardName = document.querySelectorAll('.card__name');
//     img.addEventListener('click', function() {
//         cardPopup.classList.add('card-popup_active');
//         let cardImageLink = img.src;
//     let cardImageName = cardName.textContent;
//     cardPopupImageLink = cardImageLink;
//     cardPopupImageName = cardImageName;
//     cardPopupToggle.addEventListener('click', function() {
//         cardPopup.classList.remove('card-popup_active');
//     });
//     });
// });

// cards remove from the beginning
// don't get the name of the cards