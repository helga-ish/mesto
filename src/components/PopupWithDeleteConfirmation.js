import Popup from "./Popup.js";

export default class PopupWithDeleteConfirmation extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._confirmDeleteButton = this._popupElement.querySelector('.form-button');
    }

    handleDeleteSubmit(deletion) {
        this._confirmDeleteButton.addEventListener('click', deletion);
    }

}