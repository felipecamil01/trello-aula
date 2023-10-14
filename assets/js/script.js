'use strict'


// ALTERA PLANO DE FUNDO 

const PlanoDeFundo = document.querySelector('body');


if (localStorage.hasOwnProperty('corSelecionada')) {
  const corSelecionada = localStorage.getItem('corSelecionada');
  seletor.value = corSelecionada;
  PlanoDeFundo.style.backgroundColor = corSelecionada;
}

seletor.addEventListener('input', () => {
  const corEscolhida = seletor.value;
  PlanoDeFundo.style.backgroundColor = corEscolhida;
  localStorage.setItem('corSelecionada', corEscolhida);
});

// CRUD DE TAREFAS 

function addToColumn(columnId) {
  var title = document.getElementById(columnId + "Title").value;
  var task = document.getElementById(columnId + "Task").value;

  if (title.trim() === "" || task.trim() === "") {
    alert("Preencha título e descrição!");
  } else {
    var listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${title}:</strong><br>${task}<br><button class="remove-btn"><i class="bi bi-trash-fill"></i> Remover</button>`;

    document.getElementById(columnId + "List").appendChild(listItem);

    var removeButton = listItem.querySelector('.remove-btn');
    removeButton.addEventListener('click', function() {
      if (confirm('Tem certeza de que deseja remover esta tarefa?')) {
        removeTask(listItem);
      }
    });

    document.getElementById(columnId + "Title").value = "";
    document.getElementById(columnId + "Task").value = "";

    saveTasks();
  }
}

function saveTasks() {
  var todoTasks = document.getElementById("todoList").innerHTML;
  var inProgressTasks = document.getElementById("inProgressList").innerHTML;
  var doneTasks = document.getElementById("doneList").innerHTML;

  localStorage.setItem("todoTasks", todoTasks);
  localStorage.setItem("inProgressTasks", inProgressTasks);
  localStorage.setItem("doneTasks", doneTasks);
}

function removeTask(taskItem) {
  taskItem.remove();
  saveTasks();
}

function loadTasks() {
  var todoTasks = localStorage.getItem("todoTasks");
  var inProgressTasks = localStorage.getItem("inProgressTasks");
  var doneTasks = localStorage.getItem("doneTasks");

  document.getElementById("todoList").innerHTML = todoTasks || "";
  document.getElementById("inProgressList").innerHTML = inProgressTasks || "";
  document.getElementById("doneList").innerHTML = doneTasks || "";

  var removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      if (confirm('Tem certeza de que deseja remover esta tarefa?')) {
        removeTask(button.parentElement);
      }
    });
  });
}

window.onload = function() {
  loadTasks();
};
