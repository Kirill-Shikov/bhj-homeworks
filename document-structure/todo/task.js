document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task__input');
    const tasksForm = document.getElementById('tasks__form');
    const tasksList = document.getElementById('tasks__list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    renderTasks();

    tasksForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = taskInput.value.trim();
        if (text !== '') {
            addTask(text);
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        taskElement.innerHTML = `<div class="task__title">${text}</div>
                                <a href="#" class="task__remove">&times;</a>`;

        const removeBtn = taskElement.querySelector('.task__remove');
        removeBtn.addEventListener('click', () => {
            removeTask(text);
        });

        tasksList.appendChild(taskElement);

        tasks.push(text);
        saveTasks();
    }

    function removeTask(text) {
        tasks = tasks.filter(task => task !== text);
        saveTasks();

        const taskElement = [...tasksList.children].find(el =>
            el.querySelector('.task__title').textContent === text
        );
        if (taskElement) {
            taskElement.remove();
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        tasksList.innerHTML = '';

        tasks.forEach(text => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <div class="task__title">${text}</div>
                <a href="#" class="task__remove">&times;</a>
            `;

            const removeBtn = taskElement.querySelector('.task__remove');
            removeBtn.addEventListener('click', () => {
                removeTask(text);
            });

            tasksList.appendChild(taskElement);
        });
    }
});