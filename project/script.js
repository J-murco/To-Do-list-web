document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");

    addTaskBtn.addEventListener("click", addTask);
    darkModeToggle.addEventListener("click", toggleDarkMode);
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const urgencySelect = document.getElementById("urgencySelect");
        const urgencyLevel = urgencySelect.value;

        const taskItem = document.createElement("li");
        taskItem.classList.add(urgencyLevel);

        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✔";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            taskContent.classList.toggle("completed");
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            taskItem.remove();
        });

        taskItem.appendChild(taskContent);
        taskItem.appendChild(completeBtn);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        taskInput.value = "";
    }

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
    }
});
