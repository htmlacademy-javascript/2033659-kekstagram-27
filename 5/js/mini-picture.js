import { generatePhotos } from './data.js';
const usersPicturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const usersPictures = generatePhotos();
const picturesListFragment = document.createDocumentFragment();
usersPictures.forEach(({url, likes, comments}) => {
  const userPicture = pictureTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  picturesListFragment.appendChild(userPicture);
});
usersPicturesList.appendChild(picturesListFragment);


