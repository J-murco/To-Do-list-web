document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const urgencySelect = document.getElementById("urgencySelect");

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // Add new task
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const urgency = urgencySelect.value;
        if (taskText !== "") {
            addTask(taskText, urgency);
            taskInput.value = "";
        }
    });

    function addTask(taskText, urgency) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="urgency ${urgency}">${urgency.toUpperCase()}</span>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
        `;
        li.classList.add(urgency);
        taskList.appendChild(li);
        sortTasks();
    }

    // Mark task as completed
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("complete-btn")) {
            e.target.parentElement.classList.toggle("completed");
        }
        if (e.target.classList.contains("delete-btn")) {
            e.target.parentElement.remove();
        }
    });

    // Sort tasks by urgency
    function sortTasks() {
        let tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const priority = { high: 1, medium: 2, low: 3 };
            return priority[a.classList[0]] - priority[b.classList[0]];
        });
        taskList.innerHTML = "";
        tasks.forEach(task => taskList.appendChild(task));
    }
});
