document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const urgencySelect = document.getElementById("urgencySelect");

    addTaskBtn.addEventListener("click", addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const urgency = urgencySelect.value;
        const listItem = document.createElement("li");
        listItem.classList.add(urgency);

        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="task-urgency">${urgency.toUpperCase()}</span>
            <button class="tick-btn">✅</button>
            <button class="delete-btn">❌</button>
        `;

        listItem.querySelector(".tick-btn").addEventListener("click", () => {
            listItem.classList.toggle("completed");
        });

        listItem.querySelector(".delete-btn").addEventListener("click", () => {
            taskList.removeChild(listItem);
        });

        taskList.appendChild(listItem);
        taskInput.value = "";

        sortTasks(); // Sort by urgency after adding a task
    }

    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const priority = { high: 1, medium: 2, low: 3 };
            return priority[a.classList[0]] - priority[b.classList[0]];
        });

        taskList.innerHTML = "";
        tasks.forEach(task => taskList.appendChild(task));
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});

        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
        });
    });
});
