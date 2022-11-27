import { openBigPicture } from './big-picture.js';

const usersPicturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


function getUserPicture({url, likes, comments, description}) {
  const userPicture = pictureTemplate.cloneNode(true);

  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  userPicture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture({url, likes, comments, description});
  });

  return userPicture;
}

function getPicturesListFragment(usersPicturesData) {
  const picturesListFragment = document.createDocumentFragment();

  usersPicturesData.forEach(({url, likes, comments, description}) => {
    const userPictureFilled = getUserPicture({url, likes, comments, description});
    picturesListFragment.appendChild(userPictureFilled);
  });
  return picturesListFragment;
}

function renderUsersPictures(usersPicturesData) {
  const picturesListFragmentFilled = getPicturesListFragment(usersPicturesData);
  usersPicturesList.appendChild(picturesListFragmentFilled);
}

export { renderUsersPictures };
