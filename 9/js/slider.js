const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const imgPreviewElement = document.querySelector('.img-upload__preview');

const imgUploadEffects = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    default: 1,
    cssFilterName: 'grayscale',
    cssFilterUnit: ''
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    default: 1,
    cssFilterName: 'sepia',
    cssFilterUnit: ''

  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    cssFilterName: 'invert',
    cssFilterUnit: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    default: 3,
    cssFilterName: 'blur',
    cssFilterUnit: 'px'
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    default: 3,
    cssFilterName: 'brightness',
    cssFilterUnit: ''
  }
};

function initSlider (selectedFilter) {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    imgPreviewElement.style.filter = null;
  }
  noUiSlider.create(sliderElement, {
    range: {
      min: imgUploadEffects[selectedFilter].min,
      max: imgUploadEffects[selectedFilter].max,
    },
    start: imgUploadEffects[selectedFilter].default,
    step: imgUploadEffects[selectedFilter].step,
    connect: 'lower',
  });

  effectValueElement.value = imgUploadEffects[selectedFilter].default;
  imgPreviewElement.style.filter =
    `${
      imgUploadEffects[selectedFilter].cssFilterName
    }(${
      imgUploadEffects[selectedFilter].default
    }${
      imgUploadEffects[selectedFilter].cssFilterUnit
    })`;
  sliderElement.noUiSlider.on('update', () => {
    effectValueElement.value = sliderElement.noUiSlider.get();
    imgPreviewElement.style.filter =
      `${
        imgUploadEffects[selectedFilter].cssFilterName
      }(${
        sliderElement.noUiSlider.get()
      }${
        imgUploadEffects[selectedFilter].cssFilterUnit
      })`;
  });
}

function resetEffect () {
  sliderElement.noUiSlider.destroy();
  effectValueElement.value = '';
  imgPreviewElement.style.filter = null;
}

export { initSlider, resetEffect };
