import { openPopup, cardPopup, cardPopupHeading, cardPopupImage } from './index.js';

// create card
class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likeButton = data.likeButton;
        this._removeButton = data.removeButton;
        this._cardImage = data.cardImage;
        this._templateSelector = templateSelector;
    }
    
    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
      
      return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.card__image');
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._element.querySelector('.card__name').textContent = this._name;

      this._likeButton = this._element.querySelector('.card__like');
      this._removeButton = this._element.querySelector('.card__remove');

  
    this._setEventListeners();
    return this._element;
    }

    _setEventListeners() {
      this._element.querySelector('.card__image').addEventListener('click', () => {
        this._handleOpenCard();
      });
      this._likeButton.addEventListener('click', (event) => {
        this._handlePutLike(event);
      });
      this._removeButton.addEventListener('click', () => {
        this._handleRemoveCard();
      })

    }

    _handleOpenCard() {
        openPopup(cardPopup);
        cardPopupImage.src = this._link;
        cardPopupImage.alt = this._name;
        cardPopupHeading.textContent = this._name;
    }

    _handlePutLike(event) {
      event.target.classList.toggle("card__like_active");
    }

    _handleRemoveCard() {
      this._element.remove();
    }
}

export { Card };