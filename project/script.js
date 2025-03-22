document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Load tasks from local storage
    loadTasks();

    // Add Task
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
            saveTasks();
        }
    });

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    function addTask(taskText) {
        const taskItem = document.createElement("li");

        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="tick-btn">✔</button>
                <button class="delete-btn">❌</button>
            </div>
        `;

        // Add Event Listeners for Tick and Delete
        const tickBtn = taskItem.querySelector(".tick-btn");
        const deleteBtn = taskItem.querySelector(".delete-btn");

        tickBtn.addEventListener("click", function () {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        deleteBtn.addEventListener("click", function () {
            taskItem.remove();
            saveTasks();
        });

        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(task => {
            tasks.push({
                text: task.querySelector("span").innerText,
                completed: task.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.forEach(task => {
            addTask(task.text);
            if (task.completed) {
                taskList.lastChild.classList.add("completed");
            }
        });
    }
});
