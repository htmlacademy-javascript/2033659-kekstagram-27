const ESC_KEY_CODE = 27;
const onShowedMessageEscKeydown = (event) => {
  if (event.keyCode === ESC_KEY_CODE) {
    closeMessage(event);
  }
};
const getRndInteger = function (min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }

  if (min < 0 || max < 0) {
    return NaN;
  }

  if (max <= min) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const checkStringLength = function (string, maxLength) {
  return string.length > maxLength;
};

function showSuccessMessage () {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageBlock = successMessageTemplate.cloneNode(true);
  const successButton = successMessageBlock.querySelector('.success__button');

  successMessageBlock.classList.add('showed-message');
  successButton.addEventListener('click', closeMessage);
  document.addEventListener('click', onOutsideClickCloseMessage);
  document.addEventListener('keydown', onShowedMessageEscKeydown);
  document.querySelector('body').appendChild(successMessageBlock);
}
function showErrorMessage () {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageBlock = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessageBlock.querySelector('.error__button');

  errorMessageBlock.classList.add('showed-message');
  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('click', onOutsideClickCloseMessage);
  document.addEventListener('keydown', onShowedMessageEscKeydown);
  document.querySelector('body').appendChild(errorMessageBlock);
}

function onOutsideClickCloseMessage (evt) {
  if (document.querySelector('.showed-message').contains(evt.target)) {
    closeMessage(evt);
  }
}

function closeMessage (evt) {
  evt.preventDefault();
  const showedSuccessMessage = document.querySelector('.showed-message');
  showedSuccessMessage.parentNode.removeChild(showedSuccessMessage);
  document.removeEventListener('click', onOutsideClickCloseMessage);
  document.removeEventListener('keydown', onShowedMessageEscKeydown);
}

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export { getRndInteger, checkStringLength, showErrorMessage, showSuccessMessage, debounce, throttle };
