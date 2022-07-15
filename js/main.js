// Находим элемент на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(task => renderTask(task));
}

checkEmptyList();

function addTask(event) {
  // отменяем отправку формы
  event.preventDefault();

  // Достаем текст из поля ввода
  const taskText = taskInput.value;

  // Описали обьект для новой задачи
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  // Добавляем задачу в массив с задачами
  tasks.push(newTask);

  renderTask(newTask);

  // Очищаям поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();

  saveToLocalStorage();
}
function deleteTask(event) {
  // Проверяем что клик был HE по кнопке "Удалить задачу"
  if (event.target.dataset.action !== "delete") {
    return;
  } else {
    const parentNode = event.target.closest("li");

    // Определяем ID задачи
    const id = Number(parentNode.id);

    // Удаляем задачу через фильтрацию масива
    tasks = tasks.filter((task) => task.id !== id);

    // Удаляем задачу из разметки
    parentNode.remove();

    checkEmptyList();

    saveToLocalStorage();
  }
}
function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const parentNode = event.target.closest(".list-group-item");

  // Определяем id задачи
  const id = Number(parentNode.id);
  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");

  saveToLocalStorage();

}
function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
    <img
      class="border-img"
      src="./img/leaf.jpg"
      alt="Empty"
      width="48"
      class="mt-3"
    />
    <div class="empty-list__title">Список дел пуст</div>
  </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${task.text}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
      </div>
  </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}