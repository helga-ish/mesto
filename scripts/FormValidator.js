class FormValidator {
  constructor(object, form) {
    this._object = object;
    this._form = form;
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
  
  _hasInvalidInput = (fieldList) => {
    return fieldList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };
  
  _toggleButtonState = (fieldList, buttonEl) => {
    if (this._hasInvalidInput(fieldList)) {
      buttonEl.classList.add(this._object.inactiveButtonClass);
      buttonEl.disabled = true;
    } else {
      buttonEl.classList.remove(this._object.inactiveButtonClass);
      buttonEl.disabled = false;
    };
  };
  
  _setEventListeners = () => {
    const fieldList = Array.from(this._form.querySelectorAll(this._object.formFieldSelector));
    const submitButtonEl = (this._form.parentNode).querySelector(this._object.buttonSelector);
    this._toggleButtonState(fieldList, submitButtonEl);
    fieldList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(fieldList, submitButtonEl);
      });
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