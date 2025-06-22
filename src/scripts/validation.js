export function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));

    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => evt.preventDefault());
        setEventListeners(form, settings);
    });
}

function setEventListeners(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputs, button, settings.inactiveButtonClass);

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, settings);
            toggleButtonState(inputs, button, settings.inactiveButtonClass);
        });
    });
}

function checkInputValidity(form, input, settings) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }

    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, settings);
    } else {
        hideInputError(form, input, settings);
    }
}

function showInputError(form, input, errorMessage, settings) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

function hideInputError(form, input, settings) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
    if (hasInvalidInput(inputs)) {
        button.disabled = true;
        button.classList.add(inactiveButtonClass);
    } else {
        button.disabled = false;
        button.classList.remove(inactiveButtonClass);
    }
}

function hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
}

export function clearValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    inputs.forEach((input) => {
        hideInputError(form, input, settings);
        input.setCustomValidity("");
    });

    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
}