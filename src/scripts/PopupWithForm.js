import Popup from "./Popup.js";
import { formValidators } from "./index.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formSelector = this._popupSelector.querySelector('.form');
        this._inputList = this._formSelector.querySelectorAll('.form__field');
    }

    _getInputValues() {
        this._inputValuesList = {};
        this._inputList.forEach(input => {
            this._inputValuesList[input.name] = input.value; 
        });
        return this._inputValuesList;
    }

    


    setEventListeners() {
        super.setEventListeners();
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        }, { once: true });
    }

    openPopup() {
        super.openPopup();
        formValidators[this._formSelector.getAttribute('name')].resetValidation();
    }
    closePopup() {
        super.closePopup();
        this._formSelector.reset();
        formValidators[this._formSelector.getAttribute('name')].resetValidation();
    }
}