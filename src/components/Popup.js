export default class Popup {
    constructor(popupElement) {
        this._popupElement = document.querySelector(popupElement);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    openPopup() {
        this._popupElement.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
    }
    closePopup() {
        this._popupElement.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
          };
    }
    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_active')) {
                this.closePopup();
            };
            if (evt.target.classList.contains('popup__toggle')) {
                this.closePopup();
            };
        });
    }
}

