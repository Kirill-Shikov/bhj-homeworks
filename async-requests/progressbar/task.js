const form = document.getElementById('form');
const fileInput = document.getElementById('file');
const progress = document.getElementById('progress');
const sendButton = document.getElementById('send');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!fileInput.files.length) {
    alert('Выберите файл для загрузки!');
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  
  formData.append('file', file);

  try {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        progress.value = percentComplete;
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert('Файл успешно загружен!');
        progress.value = 1;
      } else {
        alert(`Ошибка сервера: ${xhr.status}`);
      }
    };

    xhr.onerror = () => {
      alert('Произошла ошибка при загрузке файла.');
      progress.value = 0;
    };

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);
    xhr.send(formData);

  } catch (error) {
    console.error('Ошибка при отправке файла:', error);
    alert('Не удалось отправить файл. Проверьте подключение.');
    progress.value = 0;
  }
});