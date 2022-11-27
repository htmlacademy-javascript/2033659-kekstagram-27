import './form-validation.js';
import { initSlider, resetEffect } from './slider.js';
import { onPlusSize, onMinusSize, onImageUpdateScale } from './image-scale.js';
import { ESC_KEY_CODE } from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const changeEvent = new Event('change');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const onCloseImageForm = () => {
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const bodyElement = document.querySelector('body');
  const closeModalButton = imgUploadOverlay.querySelector('.img-upload__cancel');
  const imageEffectRadioButtons = document.querySelectorAll('.effects__radio');
  const plusButton = document.querySelector('.scale__control--bigger');
  const minusButton = document.querySelector('.scale__control--smaller');
  const scaleValueElement = document.querySelector('.scale__control--value');

  scaleValueElement.value = `${scaleValueElement.getAttribute('max')}%`;
  scaleValueElement.dispatchEvent(changeEvent);
  plusButton.removeEventListener('click', onPlusSize);
  minusButton.removeEventListener('click', onMinusSize);
  scaleValueElement.removeEventListener('change', onImageUpdateScale);
  closeModalButton.removeEventListener('click', onCloseImageForm);
  document.removeEventListener('keydown', onModalEscKeydown);
  imgUploadOverlay.querySelector('.text__hashtags').value = '';
  imgUploadOverlay.querySelector('.text__description').value = '';
  imgUploadOverlay.querySelector('.effects__radio[value="none"]').click();

  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadInput.value = '';
  uploadInput.addEventListener('change', onInputFileChange);
  imageEffectRadioButtons.forEach((radioButton) => {
    radioButton.removeEventListener('change', onMakeEffect);
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

  closeModalButton.addEventListener('click', onCloseImageForm);
  plusButton.addEventListener('click', onPlusSize);
  minusButton.addEventListener('click', onMinusSize);
  scaleValueElement.addEventListener('change', onImageUpdateScale);
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  imageEffectRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', onMakeEffect);
  });
};

function onMakeEffect (evt) {
  const { value, checked } = evt.target;
  if (checked) {
    if (value === 'none') {
      resetEffect();
    } else {
      initSlider(value);
    }
  }
}

function onModalEscKeydown (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    onCloseImageForm(evt);
  }
}

function onInputFileChange () {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreviewElement.src = URL.createObjectURL(file);
    openImageForm();
    uploadInput.removeEventListener('change', onInputFileChange);
  }
}

uploadInput.addEventListener('change', onInputFileChange);

function onStopEscapeForInput (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    evt.stopPropagation();
  }
}
uploadForm.querySelector('.text__hashtags').addEventListener('keydown', onStopEscapeForInput);
uploadForm.querySelector('.text__description').addEventListener('keydown', onStopEscapeForInput);

export { onCloseImageForm, onModalEscKeydown };
