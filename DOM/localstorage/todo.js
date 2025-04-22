const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', function(e) {
    console.log("Do we get here?");
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        const li = document.createElement('li');
        li.textContent = text;

        li.addEventListener('click', function() {
        li.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // prevent triggering the toggle
        li.remove();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
        input.value = '';
    }
});
