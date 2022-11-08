import { generatePhotos } from './data.js';
const usersPicturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


function getUserPicture({url, likes, comments}) {
  const userPicture = pictureTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  return userPicture;
}

function getPicturesListFragment(usersPicturesData) {
  const picturesListFragment = document.createDocumentFragment();

  usersPicturesData.forEach(({url, likes, comments}) => {
    const userPictureFilled = getUserPicture({url, likes, comments});
    picturesListFragment.appendChild(userPictureFilled);
  });
  return picturesListFragment;
}

function renderUsersPictures(usersPicturesData) {
  const picturesListFragmentFilled = getPicturesListFragment(usersPicturesData);
  usersPicturesList.appendChild(picturesListFragmentFilled);
}

const usersPicturesMockData = generatePhotos();

renderUsersPictures(usersPicturesMockData);
