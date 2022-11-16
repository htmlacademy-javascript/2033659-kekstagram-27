const uploadForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(uploadForm);

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
    inputValue.length < 420
    && hashtagList.length <= 20
    && areLstItemsUniq(hashtagList)
    && hashtagList.reduce((isHashtagValid, hashtag) => {
      if (validateHashtag(hashtag) && isHashtagValid) {
        return true;
      } else {
        return false;
      }
    }, true)
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

uploadForm.addEventListener('submit', (evt) => {
  //evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    evt.preventDefault();
    console.log('Форма невалидна');
  }
});


