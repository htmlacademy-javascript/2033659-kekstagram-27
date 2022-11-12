import { generatePhotos } from './data.js';
import { renderUsersPictures } from './mini-picture.js';

const usersPicturesData = generatePhotos();
renderUsersPictures(usersPicturesData);
generatePhotos(25);
