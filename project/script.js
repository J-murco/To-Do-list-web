document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const urgencySelect = document.getElementById("urgencySelect");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Load saved tasks from local storage
    loadTasks();

    // Add task event
    addTaskBtn.addEventListener("click", function () {
        addTask();
    });

    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        const urgency = urgencySelect.value;

        if (taskText === "") return;

        const taskItem = document.createElement("li");
        taskItem.classList.add("task");
        taskItem.setAttribute("data-urgency", urgency);

        // ✅ Tick Button
        const tickBtn = document.createElement("button");
        tickBtn.innerHTML = "✅";
        tickBtn.classList.add("tick-btn");
        tickBtn.addEventListener("click", function () {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        // ❌ Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            taskItem.remove();
            saveTasks();
        });

        // Task Content
        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;

        taskItem.appendChild(taskContent);
        taskItem.appendChild(tickBtn);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
        taskInput.value = "";

        sortTasks();
        saveTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(task => {
            tasks.push({
                text: task.querySelector("span").textContent,
                completed: task.classList.contains("completed"),
                urgency: task.getAttribute("data-urgency"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            taskInput.value = task.text;
            urgencySelect.value = task.urgency;
            addTask();
            if (task.completed) {
                taskList.lastChild.classList.add("completed");
            }
        });
    }

    // Sort tasks based on urgency
    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const urgencyLevels = { high: 1, medium: 2, low: 3 };
            return urgencyLevels[a.getAttribute("data-urgency")] - urgencyLevels[b.getAttribute("data-urgency")];
        });
        taskList.innerHTML = "";
        tasks.forEach(task => taskList.appendChild(task));
    }

    // Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
});
    function saveAndRender() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
});
