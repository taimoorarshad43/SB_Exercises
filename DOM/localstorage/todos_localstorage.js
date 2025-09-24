document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    // Saving todos in local storage
    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    // creating todo elements in HTML
    function createTodoElement(todoText, completed = false) {
      const li = document.createElement('li');
      li.textContent = todoText;
  
      if (completed) {
        li.classList.add('completed');
      }
  
      li.addEventListener('click', function () {
        li.classList.toggle('completed');
        const index = Array.from(list.children).indexOf(li);
        todos[index].completed = !todos[index].completed;
        saveTodos();
      });
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✖';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const index = Array.from(list.children).indexOf(li);
        todos.splice(index, 1);
        li.remove();
        saveTodos();
      });
  
      li.appendChild(deleteBtn);
      list.appendChild(li);
    }
  
    // Load existing todos
    todos.forEach(todo => createTodoElement(todo.text, todo.completed));
  
    // Add event listener to submit button
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = input.value.trim();
      if (text !== '') {
        todos.push({ text: text, completed: false });
        saveTodos();
        createTodoElement(text, false);
        input.value = '';
        }
      }
    );
  }
);
  