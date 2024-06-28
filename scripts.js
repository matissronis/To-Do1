document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let taskCount = 0;

    // Ielādēt uzdevumus no vietējās krātuves
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
        taskCount = tasks.length;
    };

    // Saglabāt uzdevumus vietējā krātuvē
    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Pievienot uzdevumu DOM struktūrai
    const addTaskToDOM = (taskText) => {
        taskCount++;
        const li = document.createElement('li');
        li.textContent = `${taskCount}. ${taskText}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Noņemt';
        removeBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
            updateTaskNumbers();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    };

    // Atjaunināt uzdevumu numurus pēc izdzēšanas
    const updateTaskNumbers = () => {
        const tasks = Array.from(taskList.children);
        taskCount = 0;
        tasks.forEach((li, index) => {
            const taskText = li.firstChild.textContent.split('. ')[1];
            li.firstChild.textContent = `${index + 1}. ${taskText}`;
            taskCount++;
        });
        saveTasks();
    };

    // Pievienot uzdevumu
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Ielādēt uzdevumus, kad lapa ielādējas
    loadTasks();
});
