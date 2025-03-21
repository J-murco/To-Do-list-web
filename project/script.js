document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const colorPicker = document.getElementById("colorPicker"); // 🎨 Color Picker
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle"); // 🌙 Dark Mode Toggle

    // Load tasks and dark mode preference from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let isDarkMode = localStorage.getItem("darkMode") === "enabled";
    
    applyDarkMode(isDarkMode);
    renderTasks();

    // Add a new task
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const taskColor = colorPicker.value; // Get chosen color

        if (taskText === "") return;

        const task = {
            text: taskText,
            color: taskColor, // Store the selected color
            date: new Date().toLocaleString(),
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
            console.log("Task Data:", task); // Debugging log

            const li = document.createElement("li");
            li.innerHTML = `
                <span style="color: ${task.color}; ${task.completed ? 'text-decoration: line-through;' : ''}">
                    ${task.text}
                </span>
                <small style="margin-left: 10px; color: gray;">${task.date}</small>
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

    // 🌙 Toggle Dark Mode
    darkModeToggle.addEventListener("click", function () {
        isDarkMode = !isDarkMode;
        applyDarkMode(isDarkMode);
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    });

    function applyDarkMode(enable) {
        document.body.classList.toggle("dark-mode", enable);
    }
});
