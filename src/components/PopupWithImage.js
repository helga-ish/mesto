import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup-card__image');
        this._name = this._popupSelector.querySelector('.popup-card__heading');
    }
    openPopup(name, link) {
        super.openPopup();
        this._image.src = link;
        this._image.alt = name;
        this._name.textContent = name;
    }
}