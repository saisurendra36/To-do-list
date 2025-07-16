// public/script.js
document.getElementById("todo-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (taskText !== "") {
    await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskText }),
    });
    input.value = "";
    loadTasks();
  }
});

async function loadTasks() {
  const res = await fetch("/tasks");
  const tasks = await res.json();
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.description;
    if (task.completed) li.classList.add("completed");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await fetch(/tasks/${task.id}, { method: "DELETE" });
      loadTasks();
    };

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Undo" : "Done";
    toggleBtn.onclick = async () => {
      await fetch(/tasks/${task.id}, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      loadTasks();
    };

    li.appendChild(toggleBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Load tasks on page load
loadTasks();
