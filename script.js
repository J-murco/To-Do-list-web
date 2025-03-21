document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadDarkMode();

    document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `${taskText} <button onclick="removeTask(this)">❌</button>`;
    li.onclick = () => {
        li.classList.toggle("completed");
        saveTasks();
    };

    taskList.appendChild(li);
    saveTasks();

    taskInput.value = "";
}

function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.innerText.replace("❌", "").trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let taskList = document.getElementById("taskList");
        JSON.parse(savedTasks).forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = `${task.text} <button onclick="removeTask(this)">❌</button>`;
            if (task.completed) li.classList.add("completed");
            li.onclick = () => {
                li.classList.toggle("completed");
                saveTasks();
            };
            taskList.appendChild(li);
        });
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

function loadDarkMode() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
    }
}
