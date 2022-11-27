const scaleValueElement = document.querySelector('.scale__control--value');
const changeEvent = new Event('change');

function onPlusSize (evt) {
  evt.preventDefault();
  const currentScaleValue = +scaleValueElement.value.replace('%', '');
  const step = +scaleValueElement.getAttribute('step');
  const max = +scaleValueElement.getAttribute('max');

  if (currentScaleValue < max) {
    scaleValueElement.value = `${currentScaleValue + step}%`;
    scaleValueElement.dispatchEvent(changeEvent);
  }
}

function onMinusSize (evt) {
  evt.preventDefault();
  const currentScaleValue = +scaleValueElement.value.replace('%', '');
  const step = +scaleValueElement.getAttribute('step');
  const min = +scaleValueElement.getAttribute('min');

  if (currentScaleValue > min) {
    scaleValueElement.value = `${currentScaleValue - step}%`;
    scaleValueElement.dispatchEvent(changeEvent);
  }
}

function onImageUpdateScale (evt) {
  const currentScaleValue = +evt.target.value.replace('%', '');
  const max = +evt.target.getAttribute('max');
  const cssScaleNewValue = currentScaleValue >= max ? 1 : +`0.${currentScaleValue}`;
  const imgPreviewElement = document.querySelector('.img-upload__preview');

  imgPreviewElement.style.transform = `scale(${cssScaleNewValue})`;
}

export { onPlusSize, onMinusSize, onImageUpdateScale };
