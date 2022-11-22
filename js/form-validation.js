import { submitData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './util.js';
import { closeImageForm } from './user-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const pristine = new Pristine(uploadForm);
const HASHTAG_INPUT_VALUE_MAX_LENGTH = 420;
const HASHTAG_LIST_MAX_LENGTH = 20;

function validateMaxLength (value, maxLength) {
  return value <= maxLength;
}

function hashtagListValidate (hashtagList) {
  return hashtagList.reduce(
    (isHashtagValid, hashtag) => validateHashtag(hashtag) && isHashtagValid,
    true
  );
}

function validateHashtag (hashtag) {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtagRegex.test(hashtag);
}

function areLstItemsUniq (list) {
  const listObject = {};
  list.forEach((listItem) => {
    if (listObject[listItem]) {
      listObject[listItem] += 1;
    } else {
      listObject[listItem] = 1;
    }
  });
  return Object.values(listObject).every((value) => value === 1);
}

function validateHashtagInputValue (inputValue = '') {
  if (inputValue.trim() === '') {
    return true;
  }

  const inputValueLowerCase = inputValue.toLowerCase();
  const hashtagList = inputValueLowerCase.trim().split(' ');

  return (
    validateMaxLength(inputValue.length, HASHTAG_INPUT_VALUE_MAX_LENGTH)
    && validateMaxLength(hashtagList.length, HASHTAG_LIST_MAX_LENGTH)
    && areLstItemsUniq(hashtagList)
    && hashtagListValidate(hashtagList)
  );
}

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  validateHashtagInputValue
);
pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  (value) => value.length <= 140
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    submitData(
      '',
      new FormData(evt.target),
      () => {
        unblockSubmitButton();
        closeImageForm();
        showSuccessMessage();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
    );
  }
});


