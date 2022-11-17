import './form-validation.js';

const ESC_KEY_CODE = 27;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');

const closeImageForm = (evt) => {
  evt.preventDefault();
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const bodyElement = document.querySelector('body');
  const closeModalButton = imgUploadOverlay.querySelector('.img-upload__cancel');
  closeModalButton.removeEventListener('click', closeImageForm);
  document.removeEventListener('keydown', onModalEscKeydown);

  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadInput.value = '';
  uploadInput.addEventListener('change', onInputFileChange);
};

const openImageForm = () => {
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const bodyElement = document.querySelector('body');
  const closeModalButton = imgUploadOverlay.querySelector('.img-upload__cancel');
  closeModalButton.addEventListener('click', closeImageForm);

  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};
function onModalEscKeydown (event) {
  if (event.keyCode === ESC_KEY_CODE) {
    closeImageForm(event);
  }
}

function onInputFileChange () {
  openImageForm();
  uploadInput.removeEventListener('change', onInputFileChange);
}

uploadInput.addEventListener('change', onInputFileChange);

function stopEscapeForInput (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    evt.stopPropagation();
  }
}
uploadForm.querySelector('.text__hashtags').addEventListener('keydown', stopEscapeForInput);
uploadForm.querySelector('.text__description').addEventListener('keydown', stopEscapeForInput);

