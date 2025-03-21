document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();

    // Add a new task
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const task = {
            text: taskText,
            date: new Date().toLocaleString(), // Get the current date & time
            completed: false,
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks();
    });

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <small>${task.date}</small> 
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Toggle task completion
    window.toggleTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    // Delete task
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };
});
