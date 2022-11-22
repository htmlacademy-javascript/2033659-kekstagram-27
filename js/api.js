const apiEndPoint = 'https://27.javascript.pages.academy/kekstagram';


function getData (path = '', onSuccess, onFail) {
  fetch(`${apiEndPoint}${path}`)
    .then((response) => response.json())
    .then((images) => onSuccess(images))
    .catch(() => onFail('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу'));
}

function submitData (path = '', body, onSuccess, onFail) {
  fetch(
    `${apiEndPoint}${path}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export { getData, submitData };
