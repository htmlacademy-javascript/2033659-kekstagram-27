import { submitData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './util.js';
import { onCloseImageForm } from './user-form.js';

Pristine.addValidator(
  'hashtag-validate',
  (value) => {
    const hashtagList = value.trim().split(' ');

    return hashtagListValidate(hashtagList);
  },
  // eslint-disable-next-line
  'Длина хэштега от ${1} до ${2} символов. Может состоять только из букв и цифр после #',
  1,
  true
);

Pristine.addValidator(
  'hashtag-uniq',
  (value) => {
    const inputValueLowerCase = value.toLowerCase();
    const hashtagList = inputValueLowerCase.trim().split(' ');

    return areLstItemsUniq(hashtagList);
  },
  'Хэштеги не должны повторяться',
  2,
  true
);

Pristine.addValidator(
  'hashtag-list-length',
  (value, maxLength) => {
    const hashtagList = value.trim().split(' ');

    return hashtagList.length <= maxLength;
  },
  'Максимум 5 хэштегов, разделенных пробелами',
  3,
  true
);

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

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
        onCloseImageForm();
        showSuccessMessage();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
    );
  }
});


