document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const urgencySelect = document.getElementById("urgencySelect");

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Toggle dark mode
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Add task
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const urgency = urgencySelect.value;

        if (taskText === "") return;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText} (${urgency})</span>
            <div>
                <button class="complete-btn">✅</button>
                <button class="delete-btn">❌</button>
            </div>
        `;

        // Set urgency color
        if (urgency === "high") li.style.color = "red";
        else if (urgency === "medium") li.style.color = "orange";
        else li.style.color = "green";

        taskList.appendChild(li);
        taskInput.value = "";

        // Mark task as completed
        li.querySelector(".complete-btn").addEventListener("click", () => {
            li.classList.toggle("completed");
        });

        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
        });
    });
});


    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
