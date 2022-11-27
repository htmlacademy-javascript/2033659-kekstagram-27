import { renderUsersPictures } from './mini-picture.js';
import { getData } from './api.js';
import { getRndInteger, debounce } from './util.js';

const RERENDER_DELAY = 500;
const filterButtons = document.querySelectorAll('.img-filters__button');

function cleanUpImages () {
  const imagesListElement = document.querySelector('.pictures');
  const allImages = imagesListElement.querySelectorAll('.picture');

  allImages.forEach((image) => imagesListElement.removeChild(image));
}

function onFilterDefault () {
  cleanUpImages();
  getData('/data', renderUsersPictures, alert);
}

function getRandomImages (amount, images) {
  if (images.length <= amount) {
    return images;
  }
  const imagesCopy = [...images];
  const randomImages = [];

  while(randomImages.length < amount) {
    const randomIndex = getRndInteger(0, imagesCopy.length - 1);
    randomImages.push(imagesCopy[randomIndex]);
    imagesCopy.splice(randomIndex, 1);
  }

  return randomImages;
}

function onFilterRandom () {
  const renderRandom = (images) => renderUsersPictures(getRandomImages(10, images));
  cleanUpImages();
  getData('/data', renderRandom, alert);
}

function onFilterPopular () {
  const renderPopular = (images) => {
    const imagesList = [...images];

    imagesList.sort((imageOne, imageTwo) => {
      if (imageOne.comments.length < imageTwo.comments.length) {
        return 1;
      }
      if (imageOne.comments.length > imageTwo.comments.length) {
        return -1;
      }
      return 0;
    });
    renderUsersPictures(imagesList);
  };

  cleanUpImages();
  getData('/data', renderPopular, alert);
}

function handleFilterApply (buttonElement) {
  const filterType = buttonElement.id.split('-')[1];
  switch (filterType) {
    case 'discussed':
      onFilterPopular();
      break;
    case 'random':
      onFilterRandom();
      break;
    default:
      onFilterDefault();
  }
}

function onFilterButtonsClickHandler (evt) {
  const buttonActiveCssClass = 'img-filters__button--active';
  if (!evt.target.classList.contains(buttonActiveCssClass)) {
    const debouncedHandler = debounce(
      () => handleFilterApply(evt.target),
      RERENDER_DELAY
    );
    filterButtons.forEach((button) => {
      if (button.classList.contains(buttonActiveCssClass)) {
        button.classList.remove(buttonActiveCssClass);
      }
    });

    evt.target.classList.add(buttonActiveCssClass);
    debouncedHandler();
  }
}

filterButtons.forEach((button) => button.addEventListener('click', onFilterButtonsClickHandler));

