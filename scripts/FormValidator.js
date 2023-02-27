//  edit and add form validation

const showFieldError = (formEl, inputEl, errorMessage) => {
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(allSelectors.formFieldTypeErrorClass);
    errorEl.classList.add(allSelectors.activeErrorClass);
    errorEl.textContent = errorMessage;
  };
  
  const hideFieldError = (formEl, inputEl) => {
      const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
      inputEl.classList.remove(allSelectors.formFieldTypeErrorClass);
      errorEl.classList.remove(allSelectors.activeErrorClass);
      errorEl.textContent = '';
    };
  
  const checkInputValidity = (formEl, inputEl) => {
        if (!inputEl.validity.valid) {
          showFieldError(formEl, inputEl, inputEl.validationMessage);
        } else {
          hideFieldError(formEl, inputEl);
        }
      };
  
  const hasInvalidInput = (fieldList) => {
    return fieldList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };
  
  const toggleButtonState = (fieldList, buttonEl) => {
    if (hasInvalidInput(fieldList)) {
      buttonEl.classList.add(allSelectors.inactiveButtonClass);
      buttonEl.disabled = true;
    } else {
      buttonEl.classList.remove(allSelectors.inactiveButtonClass);
      buttonEl.disabled = false;
    };
  };
  
  const setEventListeners = (formEl) => {
    const fieldList = Array.from(formEl.querySelectorAll(allSelectors.formFieldSelector));
    const submitButtonEl = (formEl.parentNode).querySelector(allSelectors.buttonSelector);
    toggleButtonState(fieldList, submitButtonEl);
    fieldList.forEach((inputEl) => {
      inputEl.addEventListener('input', function () {
        checkInputValidity(formEl, inputEl);
        toggleButtonState(fieldList, submitButtonEl);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(allSelectors.formSelector));
      formList.forEach((formEl) => {
        formEl.addEventListener('submit', function(evt) {
          evt.preventDefault();

        });
        const fieldsetList = Array.from(formEl.querySelectorAll(allSelectors.formFieldsetSelector));
       fieldsetList.forEach((fieldset) => {
         setEventListeners(fieldset);
       });
      });
  };
  enableValidation(
    allSelectors = {
    formSelector: '.form',
    formFieldsetSelector: '.form__fields',
    formFieldSelector: '.form__field',
    buttonSelector: '.form-button',
    inactiveButtonClass: 'form-button_inactive',
    activeErrorClass: 'form__field-error_active',
    formFieldTypeErrorClass: 'form__field_type_error',
  }); 