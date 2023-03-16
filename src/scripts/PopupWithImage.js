import Popup from "./Popup.js";
// import {
//     cardPopupHeading,
//     cardPopupImage
// } from './utils/constants.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup-card__image');
        this._name = this._popupSelector.querySelector('.popup-card__heading');
    }
    openPopup(link, name) {
        super.openPopup();
        this._image.src = link;
        this._image.alt = name;
        this._name.textContent = name;
    }
}