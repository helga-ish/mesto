import Popup from "./Popup.js";

export default class PopupWithDeleteConfirmation extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._confirmDeleteButton = this._popupElement.querySelector('.form-button');
    }

    handleDeleteSubmit(deletion) {
        this._deleteAction = deletion;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmDeleteButton.addEventListener('click', () => {
            this._deleteAction();
        });
    }

}