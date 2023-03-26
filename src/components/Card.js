// create card
export default class Card {
    constructor({data, handleCardClick}, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
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
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
      this._likeButton.addEventListener('click', (event) => {
        this._handlePutLike(event);
      });
      this._removeButton.addEventListener('click', () => {
        this._handleRemoveCard();
      })
    }

    _handlePutLike(event) {
      event.target.classList.toggle("card__like_active");
    }

    _handleRemoveCard() {
      this._element.remove();
    }
}