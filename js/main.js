import { renderUsersPictures } from './mini-picture.js';
import { getData } from './api.js';
import './user-form.js';

getData('/data', renderUsersPictures, alert);
