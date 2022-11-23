import { renderUsersPictures } from './mini-picture.js';
import { getData } from './api.js';
import './user-form.js';
import './filters.js';

const initImagesRender = (images) => {
  const filtersElement = document.querySelector('.img-filters');

  filtersElement.classList.remove('img-filters--inactive');
  renderUsersPictures(images);
};

getData('/data', initImagesRender, alert);
