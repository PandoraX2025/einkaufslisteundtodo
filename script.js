// das wird ein Tschernrechner plus ToDo liste
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${task}
                <button class="deleteButton" data-index="${index}">
                    <img src="images/delete.svg" alt="Delete">
                </button>
            `;
            taskList.appendChild(listItem);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push(taskText);
            updateTaskList();
            saveTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('deleteButton') || target.parentNode.classList.contains('deleteButton')) {
            let index;
            if (target.classList.contains('deleteButton')) {
                index = target.dataset.index;
            } else {
                index = target.parentNode.dataset.index;
            }
            tasks.splice(parseInt(index), 1);
            updateTaskList();
            saveTasks();
        }
    });

    updateTaskList();
});
