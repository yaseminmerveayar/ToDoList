// On app load, get all tasks from localStorage
window.onload = loadTasks;

document.querySelector("#myModal .modal-content Form").addEventListener("submit", e => {
    e.preventDefault();
    addTask();
});

function loadTasks() {
    // check if localStorage has any tasks
    // if not then return
    if (localStorage.getItem("tasks") == null) return;

    // Get the tasks from localStorage and convert it to an array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    // Loop through the tasks and add them to the list
    tasks.forEach(task => {
        const list = document.querySelector("tbody");
        const tr = document.createElement("tr");
        tr.innerHTML = `<td><span span id="task">${task.task}</span></td>
        <td><span>${task.completed}</span></td>
        <td><div class="modalButton"><button type="button" title="Edit" class="myEditBtn" onmouseenter="getCurrentTask(this)" onclick="openModal(this)">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button type="button" title="Sil" onclick="removeTask(this)">
            <i class="far fa-trash-alt" ></i>
        </button></div>
        </td>`;
        list.insertBefore(tr, list.children[0]);
    });
  }

function addTask(){
    const newTask = document.querySelector("#myModal .modal-content .forms #new-task");
    const list = document.querySelector("tbody");
    // return if task is empty
    if (newTask.value === "") {
        alert("Please add some task!");
        return false;
    }

    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: newTask.value, completed: "To Do" }]));

    // create list item, add innerHTML and append to ul
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><span span id="task">${newTask.value}</span></td>
    <td>  <span>To Do</span></td>
    <td><div class="modalButton"><button type="button" title="Edit" class="myEditBtn" onmouseenter="getCurrentTask(this)" onclick="openModal(this)">
        <i class="fa-solid fa-pen"></i>
    </button>
    <button type="button" title="Sil" onclick="removeTask(this)">
        <i class="far fa-trash-alt" ></i>
    </button></div></td>`;
      
      
    list.insertBefore(tr, list.children[0]);
    // clear input
    newTask.value = "";
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
    currentTask = event.parentNode.parentNode.parentNode.children[0].innerText;
}

document.querySelector("#myEditModal .modal-content Form").addEventListener("submit", e => {
    e.preventDefault();
    editTask();
});

// edit the task and update local storage
function editTask() {
    const newTask = document.querySelector("#myEditModal .modal-content .forms #new-edit-task");
    const process = document.querySelector("#myEditModal .modal-content .forms #process");
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    
    // check if task is empty
    if (newTask.value === "") {
      alert("Task is empty!");
      newTask.value = currentTask;
      return;
    }

    // update task
    tasks.forEach(task => {
      if (task.task === currentTask) {
        task.task = newTask.value;
        task.completed = process.value;
    }
    });
    // update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.location.reload();
  }

function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === event.parentNode.parentNode.parentNode.children[0].innerText) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.parentElement.parentElement.remove();;
}
