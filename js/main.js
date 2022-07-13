// Находим элемент на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

let tasks = [];


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

  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  // Формируем разметку для новой  задачи
  const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${newTask.text}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
      </div>
  </li>`;

  // Добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  // Очищаям поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();

  // Если в списке более двух элементов, скрываем его
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}
function deleteTask(event) {
  // Проверяем что клик был HE по кнопке "Удалить задачу"
  if (event.target.dataset.action !== "delete") {
    return;
  } else {
    const parentNode = event.target.closest("li");

    // Определяем ID задачи
    const id = Number(parentNode.id);


    // // Находим индекс задачи в масиве
    // const index = tasks.findIndex( (task) => task.id === id);

    // // Удаляем задачу из масива
    // tasks.splice(index, 1);


    tasks = tasks.filter(function (task) {
      if (task.id === id) {
        return false
      } else {
        return true
      }
    })

    console.log(tasks)

    // Удаляем задачу из разметки
    parentNode.remove();
    if (tasksList.children.length == 1) {
      emptyList.classList.remove("none");
    }
  }
}
function doneTask(event) {
  if (event.target.dataset.action !== "done") return
  const parentNode = event.target.closest(".list-group-item");
  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}
