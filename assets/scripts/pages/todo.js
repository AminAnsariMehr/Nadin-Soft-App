const addTaskForm = document.getElementById("addTaskForm");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const todoTaskNumber = document.getElementById("toDoTaskNumber");
const doneTaskNumber = document.getElementById("doneTaskNumber");
const savedTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
const savedDoneTasks = localStorage.getItem("doneTasks")
    ? JSON.parse(localStorage.getItem("doneTasks"))
    : [];
let taskID = savedTasks.length ? savedTasks[savedTasks.length - 1].id : 0;
let doneTaskID = savedDoneTasks.length ? savedDoneTasks[savedDoneTasks.length - 1].id : 0;

// ---------------------------------- Expression Functions
const saveTasksToLocal = () => localStorage.setItem("tasks", JSON.stringify(savedTasks));
const saveDoneTasksToLocal = () =>
    localStorage.setItem("doneTasks", JSON.stringify(savedDoneTasks));

// ---------------------------------- Process
window.addEventListener("load", () => {
    savedTasks.forEach(item => {
        createTaskElement(item.id, item.task);
    });
    savedDoneTasks.forEach(item => {
        createDoneTaskElement(item.id, item.task);
    });
    updateDisplayNumberTasks();
});

addTaskForm.addEventListener("submit", function (e) {
    const addInput = this.children[0];
    const task = addInput.value.trim();

    if (task) {
        createTaskElement(++taskID, task);
        savedTasks.push({ id: taskID, task: task });
        updateDisplayNumberTasks();
        saveTasksToLocal();
    }
    addInput.value = "";
    e.preventDefault();
});

todoList.addEventListener("click", e => {
    const parentElement = e.target.parentElement;
    if (e.target.classList.contains("todoList__todoCheckIcon")) {
        // Done Button
        const task = savedTasks.splice(
            savedTasks.findIndex(item => item.id === +parentElement.id),
            1
        );
        taskID = taskID === +parentElement.id ? --taskID : taskID;
        createDoneTaskElement(++doneTaskID, task[0].task);
        parentElement.remove();
        savedDoneTasks.push({ id: doneTaskID, task: task[0].task });
        updateDisplayNumberTasks();
        saveTasksToLocal();
        saveDoneTasksToLocal();
    } else if (e.target.classList.contains("todoList__todoEditIcon")) {
        // Edit Button
        const newTask = prompt("Enter new task: ");
        if (newTask) {
            savedTasks[savedTasks.findIndex(item => item.id === +parentElement.id)].task = newTask;
            parentElement.children[0].innerText = newTask;
            saveTasksToLocal();
        }
    } else if (e.target.classList.contains("todoList__todoDeleteIcon")) {
        // Delete Button
        savedTasks.splice(
            savedTasks.findIndex(item => item.id === +parentElement.id),
            1
        );
        taskID = taskID === +parentElement.id ? --taskID : taskID;
        updateDisplayNumberTasks();
        parentElement.remove();
        saveTasksToLocal();
    }
});

doneList.addEventListener("click", e => {
    const parentElement = e.target.parentElement;
    if (e.target.classList.contains("doneList__deleteIcon")) {
        // Delete Button
        savedDoneTasks.splice(
            savedDoneTasks.findIndex(item => item.id === +parentElement.id),
            1
        );
        doneTaskID = doneTaskID === +parentElement.id ? --doneTaskID : doneTaskID;
        updateDisplayNumberTasks();
        parentElement.remove();
        saveDoneTasksToLocal();
    } else if (e.target.classList.contains("doneList__restoreIcon")) {
        // Restore Button
        const task = savedDoneTasks.splice(
            savedDoneTasks.findIndex(item => item.id === +parentElement.id),
            1
        );
        doneTaskID = doneTaskID === +parentElement.id ? --doneTaskID : doneTaskID;
        createTaskElement(++taskID, task[0].task);
        parentElement.remove();
        savedTasks.push({ id: taskID, task: task[0].task });
        updateDisplayNumberTasks();
        saveTasksToLocal();
        saveDoneTasksToLocal();
    }
});

// ---------------------------------- Declaration Functions
function createTaskElement(id, task) {
    todoList.innerHTML += `
        <li class="todoList__todoItems" id="${id}">
            <span class="todoList__todoTask">${task}</span>
            <i class="fa-light fa-check todoList__todoCheckIcon"></i>
            <i
            class="fa-light fa-pen-to-square todoList__todoEditIcon"
            ></i>
            <i class="fa-light fa-trash todoList__todoDeleteIcon"></i>
        </li>`;
}

function createDoneTaskElement(id, task) {
    doneList.innerHTML += `
        <li class="doneList__doneItems" id="${id}">
            <span class="doneList__doneTask">${task}</span>
            <i class="fa-light fa-arrows-rotate doneList__restoreIcon"></i>
            <i class="fa-light fa-trash doneList__deleteIcon"></i>
        </li>`;
}

function updateDisplayNumberTasks() {
    const todoNumber = savedTasks.length;
    const doneNumber = savedDoneTasks.length;
    todoTaskNumber.innerText = todoNumber;
    doneTaskNumber.innerText = doneNumber;
}
