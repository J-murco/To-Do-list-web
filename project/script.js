document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const urgencySelect = document.getElementById("urgencySelect");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();

    // Add Task Button Click Event
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const urgency = urgencySelect.value;
        
        if (taskText !== "") {
            tasks.push({ text: taskText, urgency, completed: false });
            saveAndRender();
            taskInput.value = ""; // Clear input
        }
    });

    // Function to Render Tasks
    function renderTasks() {
        taskList.innerHTML = "";
        
        // Sort tasks by urgency (High > Medium > Low)
        const urgencyOrder = { high: 1, medium: 2, low: 3 };
        tasks.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.toggle("completed", task.completed);

            // Create task text with urgency label
            const taskSpan = document.createElement("span");
            taskSpan.innerHTML = `<strong>[${task.urgency.toUpperCase()}]</strong> ${task.text}`;
            
            // Task Buttons Container
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("task-buttons");

            // ✔ Complete Button
            const tickBtn = document.createElement("button");
            tickBtn.innerHTML = "✔";
            tickBtn.classList.add("tick-btn");
            tickBtn.addEventListener("click", () => {
                task.completed = !task.completed;
                saveAndRender();
            });

            // ❌ Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "❌";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => {
                tasks.splice(index, 1);
                saveAndRender();
            });

            // Append elements
            buttonContainer.appendChild(tickBtn);
            buttonContainer.appendChild(deleteBtn);
            li.appendChild(taskSpan);
            li.appendChild(buttonContainer);
            taskList.appendChild(li);
        });
    }

    // Save and Render Function
    function saveAndRender() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
