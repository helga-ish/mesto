import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupElement, handleFormSubmit}) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__field');
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
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const objectWithValues = this._getInputValues();
            this._handleFormSubmit(objectWithValues);
            
        });
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}