import Popup from "./Popup.js";
import { formValidators } from "./index.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formSelector = this._popupSelector.querySelector('.form');

    }

    _getInputValues() {

    }

    _handlePreventDefaultSubmit = (evt) => {
        evt.preventDefault();
      }

    setEventListeners() {
        super.setEventListeners();
        this._formSelector.addEventListener('submit', (evt) => {
            this._handlePreventDefaultSubmit(evt);
            this._handleFormSubmit(evt);
            this.closePopup();
            formValidators[this._formSelector.getAttribute('name')].resetValidation();
        });
    }

    openPopup() {
        super.openPopup();
        formValidators[this._formSelector.getAttribute('name')].resetValidation();
    }
    closePopup() {
        super.closePopup();
        this._formSelector.reset();
    }
}