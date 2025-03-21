document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const urgencySelect = document.getElementById("urgencySelect");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Dark mode toggle
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Add new task
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const urgency = urgencySelect.value;

        if (taskText === "") return;

        addTask(taskText, urgency);
        taskInput.value = "";
    });

    function addTask(text, urgency) {
        const li = document.createElement("li");
        li.setAttribute("data-urgency", urgency);

        // Task description
        const span = document.createElement("span");
        span.textContent = text;
        li.appendChild(span);

        // ✅ Complete button
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✔";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", function () {
            span.classList.toggle("completed");
        });
        li.appendChild(completeBtn);

        // ❌ Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.style.color = "black"; // Ensure black cross
        deleteBtn.addEventListener("click", function () {
            li.remove();
        });
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
        sortTasks();
    }

    // Sort tasks by urgency (High → Medium → Low)
    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const priority = { "high": 1, "medium": 2, "low": 3 };
            return priority[a.getAttribute("data-urgency")] - priority[b.getAttribute("data-urgency")];
        });

        taskList.innerHTML = "";
        tasks.forEach(task => taskList.appendChild(task));
    }
});
