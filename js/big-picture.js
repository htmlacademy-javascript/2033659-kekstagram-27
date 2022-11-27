import { ESC_KEY_CODE } from './util.js';

const COMMENTS_AMMOUNT_TO_SHOW = 5;
const onModalEscKeydown = (evt) => {
  if (evt.keyCode === ESC_KEY_CODE) {
    onCloseBigPicture(evt);
  }
};
const allComments = [];
let showedCommentsCount = 0;

function createComment ({avatar, message, name}) {
  const commentElement = document.createElement('li');
  const avatarElement = document.createElement('img');
  const textElement = document.createElement('p');

  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.classList.add('social__comment');
  commentElement.appendChild(avatarElement);
  commentElement.appendChild(textElement);

  return commentElement;
}

function renderComments () {
  const socialComments = document.querySelector('.social__comments');
  const commentsCountShowed = document.querySelector('.comments-count-showed');
  const commentsLoadButton = document.querySelector('.comments-loader');
  const startIndex = showedCommentsCount === 0 ? 0 : showedCommentsCount;
  const stopIndex =
    allComments.length - showedCommentsCount <= COMMENTS_AMMOUNT_TO_SHOW
      ? allComments.length
      : (showedCommentsCount + COMMENTS_AMMOUNT_TO_SHOW);
  let renderedCommentsCount = 0;

  for (let i = startIndex; i < stopIndex; i++) {
    const filledCommentElement = createComment(allComments[i]);
    socialComments.appendChild(filledCommentElement);
    renderedCommentsCount += 1;
  }

  showedCommentsCount += renderedCommentsCount;
  commentsCountShowed.textContent = showedCommentsCount;

  if (showedCommentsCount === allComments.length) {
    commentsLoadButton.removeEventListener('click', onShowMoreComments);
    commentsLoadButton.classList.add('hidden');
  }
}

function onShowMoreComments (evt) {
  evt.preventDefault();
  renderComments();
}

function fillBigPicture ({url, likes, comments, description}) {
  const bigPictureOverlay = document.querySelector('.big-picture');
  bigPictureOverlay.querySelector('.big-picture__img img').src = url;
  bigPictureOverlay.querySelector('.likes-count').textContent = likes;
  bigPictureOverlay.querySelector('.comments-count').textContent = comments.length;
  bigPictureOverlay.querySelector('.social__caption').textContent = description;
}

function openBigPicture ({url, likes, comments, description}) {
  const bigPictureOverlay = document.querySelector('.big-picture');
  const bodyElement = document.querySelector('body');
  const closeBigPictureButton = bigPictureOverlay.querySelector('.big-picture__cancel');
  const commentsLoadButton = bigPictureOverlay.querySelector('.comments-loader');
  const socialComments = document.querySelector('.social__comments');

  socialComments.innerHTML = '';
  allComments.push(...comments);

  if (comments.length < 6) {
    commentsLoadButton.classList.add('hidden');
  }

  fillBigPicture({url, likes, comments, description});
  renderComments();
  bodyElement.classList.add('modal-open');
  closeBigPictureButton.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onModalEscKeydown);
  commentsLoadButton.addEventListener('click', onShowMoreComments);
  bigPictureOverlay.classList.remove('hidden');
}

function onCloseBigPicture (evt) {
  evt.preventDefault();
  const bigPictureOverlay = document.querySelector('.big-picture');
  const bodyElement = document.querySelector('body');
  const closeBigPictureButton = bigPictureOverlay.querySelector('.big-picture__cancel');
  const commentsLoadButton = bigPictureOverlay.querySelector('.comments-loader');

  commentsLoadButton.classList.remove('hidden');
  commentsLoadButton.removeEventListener('click', onShowMoreComments);
  showedCommentsCount = 0;
  allComments.splice(0, allComments.length);

  bodyElement.classList.remove('modal-open');
  bigPictureOverlay.classList.add('hidden');
  closeBigPictureButton.removeEventListener('click', onCloseBigPicture);
  closeBigPictureButton.removeEventListener('keydown', onModalEscKeydown);
}

export { openBigPicture };
