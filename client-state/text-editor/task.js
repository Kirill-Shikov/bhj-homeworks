const  editor = document.getElementById('editor');
const clearBtn = document.getElementById('clearBtn');

const STORAGE_KEY = 'editorContent';

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, editor.value);
}

function loadFromStorage() {
  const savedContent = localStorage.getItem(STORAGE_KEY);
  if (savedContent !== null) {
    editor.value = savedContent;
  }
}

function clearEditor() {
  editor.value = '';
  localStorage.removeItem(STORAGE_KEY);
  editor.focus();
}

editor.addEventListener('input', saveToStorage);

clearBtn.addEventListener('click', clearEditor);

editor.addEventListener('blur', saveToStorage);

window.addEventListener('load', loadFromStorage);