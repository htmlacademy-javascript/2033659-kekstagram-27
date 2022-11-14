const ESC_KEY_CODE = 27;
const onModalEscKeydown = (event) => {
  if (event.keyCode === ESC_KEY_CODE) {
    closeBigPicture(event);
  }
};

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

function renderComments (commentsList) {
  const socialComments = document.querySelector('.social__comments');

  socialComments.innerHTML = '';

  commentsList.forEach((comment) => {
    const filledCommentElement = createComment(comment);
    socialComments.appendChild(filledCommentElement);
  });
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
  const commentCount = bigPictureOverlay.querySelector('.social__comment-count');
  const commentsLoadButton = bigPictureOverlay.querySelector('.comments-loader');

  commentCount.classList.add('hidden');
  commentsLoadButton.classList.add('hidden');
  fillBigPicture({url, likes, comments, description});
  renderComments(comments);
  bodyElement.classList.add('modal-open');
  closeBigPictureButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onModalEscKeydown);
  bigPictureOverlay.classList.remove('hidden');
}

function closeBigPicture (event) {
  event.preventDefault();
  const bigPictureOverlay = document.querySelector('.big-picture');
  const bodyElement = document.querySelector('body');
  const closeBigPictureButton = bigPictureOverlay.querySelector('.big-picture__cancel');
  const commentCount = bigPictureOverlay.querySelector('.social__comment-count');
  const commentsLoadButton = bigPictureOverlay.querySelector('.comments-loader');

  commentCount.classList.remove('hidden');
  commentsLoadButton.classList.remove('hidden');

  bodyElement.classList.remove('modal-open');
  bigPictureOverlay.classList.add('hidden');
  closeBigPictureButton.removeEventListener('click', closeBigPicture);
  closeBigPictureButton.removeEventListener('keydown', onModalEscKeydown);
}

export { openBigPicture };
