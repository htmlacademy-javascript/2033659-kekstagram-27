const ESC_KEY_CODE = 27;
const onShowedMessageEscKeydown = (event) => {
  if (event.keyCode === ESC_KEY_CODE) {
    closeMessage(event);
  }
};
const getRndInteger = function (min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }

  if (min < 0 || max < 0) {
    return NaN;
  }

  if (max <= min) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const checkStringLength = function (string, maxLength) {
  return string.length > maxLength;
};

function showSuccessMessage () {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageBlock = successMessageTemplate.cloneNode(true);
  const successButton = successMessageBlock.querySelector('.success__button');

  successMessageBlock.classList.add('showed-message');
  successButton.addEventListener('click', closeMessage);
  document.addEventListener('click', onOutsideClickCloseMessage);
  document.addEventListener('keydown', onShowedMessageEscKeydown);
  document.querySelector('body').appendChild(successMessageBlock);
}
function showErrorMessage () {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageBlock = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessageBlock.querySelector('.error__button');

  errorMessageBlock.classList.add('showed-message');
  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('click', onOutsideClickCloseMessage);
  document.addEventListener('keydown', onShowedMessageEscKeydown);
  document.querySelector('body').appendChild(errorMessageBlock);
}

function onOutsideClickCloseMessage (evt) {
  if (document.querySelector('.showed-message').contains(evt.target)) {
    closeMessage(evt);
  }
}

function closeMessage (evt) {
  evt.preventDefault();
  const showedSuccessMessage = document.querySelector('.showed-message');
  showedSuccessMessage.parentNode.removeChild(showedSuccessMessage);
  document.removeEventListener('click', onOutsideClickCloseMessage);
  document.removeEventListener('keydown', onShowedMessageEscKeydown);
}

export { getRndInteger, checkStringLength, showErrorMessage, showSuccessMessage };
