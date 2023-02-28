import { openPopup, cardPopup, cardPopupHeading, cardPopupImage } from './index.js';

// create card
class Card {
    constructor(name, link, like, remove) {
        this._name = name;
        this._link = link;
        this._like = like;
        this._remove = remove;
    }
    
    _getTemplate() {
      const cardElement = document
      .querySelector('#new-card')
      .content
      .querySelector('.card')
      .cloneNode(true);
      
      return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      const cardElementImage = this._element.querySelector('.card__image');
      cardElementImage.src = this._link;
      cardElementImage.alt = this._name;
      this._element.querySelector('.card__name').textContent = this._name;

  
    this._setEventListeners();
    return this._element;
    }

    _setEventListeners() {
      this._element.querySelector('.card__image').addEventListener('click', () => {
        this._handleOpenCard();
      });
      const likeNewButton = this._element.querySelector('.card__like');
      likeNewButton.addEventListener('click', () => {
        this._handlePutLike();
      });
      const removeNewButton =  this._element.querySelector('.card__remove');
      removeNewButton.addEventListener('click', () => {
        this._handleRemoveCard();
      })

    }

    _handleOpenCard() {
        openPopup(cardPopup);
        cardPopupImage.src = this._link;
        cardPopupImage.alt = this._name;
        cardPopupHeading.textContent = this._name;
    }

    _handlePutLike() {
      event.target.classList.toggle("card__like_active");
    }

    _handleRemoveCard() {
      this._element.remove();
    }
}

export { Card };