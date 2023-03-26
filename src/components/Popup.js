export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    openPopup() {
        this._popupSelector.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
    }
    closePopup() {
        this._popupSelector.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
          };
    }
    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_active')) {
                this.closePopup();
            };
            if (evt.target.classList.contains('popup__toggle')) {
                this.closePopup();
            };
        });
    }
}

