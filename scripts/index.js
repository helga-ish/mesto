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
const editPopupToggle = editPopup.querySelector('.popup__toggle');
const editForm = editPopup.querySelector('.form');

const inputName = document.querySelector('.form__field_type_name');
const inputAbout = document.querySelector('.form__field_type_about');


const cardPopupToggle = document.querySelector('.popup-card__toggle');
const cardPopup = document.querySelector('#popup-card');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#popup-add');
const addPopupToggle = addPopup.querySelector('.popup__toggle');
const addForm = addPopup.querySelector('.form');

const inputCardName = document.querySelector('.form__field_type_card-name');
const inputLink = document.querySelector('.form__field_type_link');


const cardTemplate = document.querySelector('#new-card').content;
const cardGallery = document.querySelector('.gallery__list');

const cardPopupImage = cardPopup.querySelector('.popup-card__image');
const cardPopupHeading = cardPopup.querySelector('.popup-card__heading');

// function for opening and closing popups
function openPopup(popup) {
    popup.classList.add('popup_active');
};
function closePopup(popup) {
    popup.classList.remove('popup_active');
};

// open and close edit popup
function openEditPopup() {
    openPopup(editPopup);
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
};
editButton.addEventListener('click', openEditPopup);

function closeEditPopup() {
    closePopup(editPopup);
};
editPopupToggle.addEventListener('click', closeEditPopup);

// edit form submit
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeEditPopup();
}
editForm.addEventListener('submit', handleFormSubmit);

// add new card function
let cardElement;

function createNewCard(link, name) {
    cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__name').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;

    // put like:
    const likeNewButton = cardElement.querySelector('.card__like');
    likeNewButton.addEventListener('click', (event) => {
        event.target.classList.toggle("card__like_active");
    });
    // remove card:
    const removeNewButton = cardElement.querySelector('.card__remove');
    removeNewButton.addEventListener('click', function() {
        this.parentNode.remove();
    });
    // open new card popup:
    const cardElementImage = cardElement.querySelector('.card__image');
    cardElementImage.addEventListener('click', function(event) {
        openPopup(cardPopup);
        cardPopupImage.src = event.target.src;
        cardPopupImage.alt = event.target.alt;
        cardPopupHeading.textContent = event.target.alt;
    });

    return cardElement;
};

//showing 6 initial cards:
  initialCards.forEach(function (element) {
    createNewCard(element.link, element.name);
    cardGallery.append(cardElement);
  });


// add new card button:
function handleAddFormSubmit (evt) {
    evt.preventDefault();
    createNewCard(inputLink.value, inputCardName.value);
    cardGallery.prepend(cardElement); 
    closeAddPopup();
    addForm.reset(); 
};
addForm.addEventListener('submit', handleAddFormSubmit);

// open and close addPopup:
function openAddPopup() {
    openPopup(addPopup);
};
addButton.addEventListener('click', openAddPopup);

function closeAddPopup() {
    closePopup(addPopup);
};
addPopupToggle.addEventListener('click', closeAddPopup);

// close new card popup
cardPopupToggle.addEventListener('click', function() {
    closePopup(cardPopup);
});

// close popups with escape and overlay click
const popupList = document.querySelectorAll('.popup');
popupList.forEach(popup => {
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape' && popup.classList.contains('popup_active')) {
        closePopup(popup);
      };
  });
  document.addEventListener('click', function(evt) {
    if (evt.target == popup) {
      closePopup(popup);
    };
  });
});