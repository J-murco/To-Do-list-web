document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const urgency = document.getElementById("urgencySelect").value;
        if (taskText) {
            addTask(taskText, urgency);
            taskInput.value = "";
        }
    });

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    function addTask(text, urgency) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item", urgency);
        taskItem.innerHTML = `
            <span class="task-text">${text}</span>
            <span class="urgency">(${urgency.toUpperCase()})</span>
            <button class="tick">✔</button>
            <button class="delete">✖</button>
        `;

        taskItem.querySelector(".tick").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });

        taskItem.querySelector(".delete").addEventListener("click", () => {
            taskItem.remove();
        });

        taskList.appendChild(taskItem);
        sortTasks();
    }

    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const urgencyOrder = { high: 1, medium: 2, low: 3 };
            return urgencyOrder[a.classList[1]] - urgencyOrder[b.classList[1]];
        });
        tasks.forEach(task => taskList.appendChild(task));
    }
});
