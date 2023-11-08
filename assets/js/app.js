// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const droppables = document.querySelectorAll(".swim-lane");

// Event Listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", delectItem);

// Functions
function addTodo(event) {
  event.preventDefault();
  // create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Drag
  todoDiv.setAttribute("draggable", "true");

  todoDiv.addEventListener("dragstart", () => {
    todoDiv.classList.add("is-dragging");
  });

  todoDiv.addEventListener("dragend", () => {
    todoDiv.classList.remove("is-dragging");
  });
  // create Delect Button
  const delectButton = document.createElement("button");
  delectButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  delectButton.classList.add("delect-btn");
  todoDiv.appendChild(delectButton);
  // append to list
  todoList.appendChild(todoDiv);
  // clear todo input value
  todoInput.value = "";
}

function delectItem(e) {
  const item = e.target;
  // delect todo
  if (item.classList[0] === "delect-btn") {
    const todo = item.parentElement;
    todo.remove();
  }
}

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
