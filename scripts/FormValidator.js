class FormValidator {
  constructor(object, form, fieldList, submitButton) {
    this._object = object;
    this._form = form;
    this._fieldList = fieldList;
    this._submitButton = submitButton;
  }

  _showFieldError = (inputEl, errorMessage) => {
    const errorEl = this._form.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._object.formFieldTypeErrorClass);
    errorEl.classList.add(this._object.activeErrorClass);
    errorEl.textContent = errorMessage;
  };
  
  _hideFieldError = (inputEl) => {
      const errorEl = this._form.querySelector(`.${inputEl.id}-error`);
      inputEl.classList.remove(this._object.formFieldTypeErrorClass);
      errorEl.classList.remove(this._object.activeErrorClass);
      errorEl.textContent = '';
    };
  
  _checkInputValidity = (inputEl) => {
        if (!inputEl.validity.valid) {
          this._showFieldError(inputEl, inputEl.validationMessage);
        } else {
          this._hideFieldError(inputEl);
        }
      };
  
  _hasInvalidInput = () => {
    return this._fieldList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };
  
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._object.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._object.inactiveButtonClass);
      this._submitButton.disabled = false;
    };
  };
  
  _setEventListeners = () => {
    this._fieldList = Array.from(this._form.querySelectorAll(this._object.formFieldSelector));
    this._submitButton = (this._form.parentNode).querySelector(this._object.buttonSelector);
    this._toggleButtonState();
    this._fieldList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  };

  resetValidation = () => {
    this._toggleButtonState();
    this._fieldList.forEach((inputEl) => {
      this._hideFieldError(inputEl);
    });
  };
  
  enableValidation = () => {
        this._form.addEventListener('submit', function(evt) {
          evt.preventDefault();
        });
        this._setEventListeners();
      };
  };

export { FormValidator };