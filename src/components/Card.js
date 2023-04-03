// create card
export default class Card {
    constructor({data, userId, handleCardClick, handleCardDeleteIcon, handleLikeToggle}, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._handleCardDeleteIcon = handleCardDeleteIcon;
        this._handleLikeToggle = handleLikeToggle;
        this._templateSelector = templateSelector;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._userId = userId;
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
      this._likeCount = this._element.querySelector('.card__like-count');
      this._setEventListeners();
      return this._element;
    }

    _setEventListeners() {
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
      this._likeButton.addEventListener('click', (event) => {
        this._handleLikeToggle();
        this._handlePutLike(event);
      });
      if (this._ownerId !== this._userId) {
        this._removeButton.remove();
      }
      this._removeButton.addEventListener('click', () => {
        this._handleCardDeleteIcon();
      })
      this.showLikesQuantity();
    }

    _handlePutLike(event) {
      event.target.classList.toggle("card__like_active");
    }
    

    handleRemoveCard() {
      this._element.remove();
    }

    showLikesQuantity() {
      this._likeCount.textContent = this._likes.length;
    }

    isLiked() {
      if(this._likeButton.classList.contains("card__like_active")) {
        return true;
      } else {return false};
    }
}