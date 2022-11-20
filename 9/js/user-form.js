import './form-validation.js';
import { initSlider, resetEffect } from './slider.js';
import { plusSize, minusSize, imageUpdateScale } from './image-scale.js';

const ESC_KEY_CODE = 27;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const changeEvent = new Event('change');

const closeImageForm = (evt) => {
  evt.preventDefault();
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const bodyElement = document.querySelector('body');
  const closeModalButton = imgUploadOverlay.querySelector('.img-upload__cancel');
  const imageEffectRadioButtons = document.querySelectorAll('.effects__radio');
  const plusButton = document.querySelector('.scale__control--bigger');
  const minusButton = document.querySelector('.scale__control--smaller');
  const scaleValueElement = document.querySelector('.scale__control--value');

  scaleValueElement.value = `${scaleValueElement.getAttribute('max')}%`;
  scaleValueElement.dispatchEvent(changeEvent);
  plusButton.removeEventListener('click', plusSize);
  minusButton.removeEventListener('click', minusSize);
  scaleValueElement.removeEventListener('change', imageUpdateScale);
  closeModalButton.removeEventListener('click', closeImageForm);
  document.removeEventListener('keydown', onModalEscKeydown);

  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadInput.value = '';
  uploadInput.addEventListener('change', onInputFileChange);
  imageEffectRadioButtons.forEach((radioButton) => {
    radioButton.removeEventListener('change', makeEffect);
  });
};

const openImageForm = () => {
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const bodyElement = document.querySelector('body');
  const closeModalButton = imgUploadOverlay.querySelector('.img-upload__cancel');
  const imageEffectRadioButtons = document.querySelectorAll('.effects__radio');
  const plusButton = document.querySelector('.scale__control--bigger');
  const minusButton = document.querySelector('.scale__control--smaller');
  const scaleValueElement = document.querySelector('.scale__control--value');

  closeModalButton.addEventListener('click', closeImageForm);
  plusButton.addEventListener('click', plusSize);
  minusButton.addEventListener('click', minusSize);
  scaleValueElement.addEventListener('change', imageUpdateScale);
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  imageEffectRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', makeEffect);
  });
};

function makeEffect (evt) {
  const { value, checked } = evt.target;
  if (checked) {
    if (value === 'none') {
      resetEffect();
    } else {
      initSlider(value);
    }
  }
}

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

