import { getRndInteger } from './util.js';

const messagesList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const namesList = [
  'Васисуалий',
  'Акакий',
  'Даздраперма',
  'Павсикакий',
  'Хоздозат',
  'Соссия'
];

const commentIds = [];

const generateCommentId = () => {
  let generatedId = 0;

  while (commentIds.includes(generatedId)) {
    generatedId += 1;
  }

  commentIds.push(generatedId);
  return generatedId;
};

const createComment = () => {
  const generatedId = generateCommentId();
  const generatedAvatar = getRndInteger(1, 6);
  const generatedMessage = getRndInteger(0, messagesList.length - 1);

  return {
    id: generatedId, // random
    avatar: `img/avatar-${generatedAvatar}.svg`, // random 1-6
    message: messagesList[generatedMessage], //random list
    name: namesList[generatedAvatar - 1], // random list
  };
};

const generateComments = (maxAmount = 1) => {
  const comments = [];

  for (let i = 1; i <= maxAmount; i++) {
    comments.push(createComment());
  }

  return comments;
};

const createPhoto = (id) => {
  const generatedLikes = getRndInteger(15, 200);

  return {
    id: id, // random 1-25
    url: `photos/${id}.jpg`, // id
    description: 'Очень красивая фотография',
    likes: generatedLikes, // random 15-200
    comments: generateComments(getRndInteger(1, 25)),
  };
};

const generatePhotos = (maxAmount = 25) => {
  const photos = [];

  for (let id = 1; id <= maxAmount; id++) {
    photos.push(createPhoto(id));
  }

  return photos;
};

export { generatePhotos };

