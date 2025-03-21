document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const urgencySelect = document.getElementById("urgencySelect");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let isDarkMode = localStorage.getItem("darkMode") === "enabled";

    applyDarkMode(isDarkMode);
    renderTasks();

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const urgency = urgencySelect.value;

        if (taskText === "") return;

        const task = {
            text: taskText,
            urgency: urgency,
            date: new Date().toLocaleString(), // Adds the date
            completed: false,
        };

        tasks.push(task);
        saveAndRender();
        taskInput.value = "";
    });

    function renderTasks() {
        taskList.innerHTML = "";

        // Sort tasks by urgency (High > Medium > Low)
        tasks.sort((a, b) => {
            const urgencyLevels = { high: 1, medium: 2, low: 3 };
            return urgencyLevels[a.urgency] - urgencyLevels[b.urgency];
        });

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">
                    ${task.text} - <strong>${getUrgencyLabel(task.urgency)}</strong>
                </span>
                <small style="margin-left: 10px; color: gray;">${task.date}</small>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            `;
            taskList.appendChild(li);
        });
    }

    function getUrgencyLabel(urgency) {
        if (urgency === "high") return "🔥 High";
        if (urgency === "medium") return "⚠ Medium";
        return "✅ Low";
    }

    window.toggleTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        saveAndRender();
    };

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        saveAndRender();
    };

    darkModeToggle.addEventListener("click", function () {
        isDarkMode = !isDarkMode;
        applyDarkMode(isDarkMode);
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    });

    function applyDarkMode(enable) {
        document.body.classList.toggle("dark-mode", enable);
    }

    function saveAndRender() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
});
