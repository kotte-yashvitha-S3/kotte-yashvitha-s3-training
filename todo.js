<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanilla JS To-Do App</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 480px;
      margin: 40px auto;
      padding: 0 20px;
      background: #f9fafb;
      color: #111827;
    }
    form {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }
    input[type="text"] {
      flex: 1;
      padding: 10px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 16px;
    }
    button {
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }
    #add-btn {
      background: #2563eb;
      color: white;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
    }
    .todo-text {
      flex: 1;
      cursor: pointer;
      user-select: none;
    }
    li.completed .todo-text {
      text-decoration: line-through;
      color: #9ca3af;
    }
    .delete-btn {
      background: #fee2e2;
      color: #dc2626;
      padding: 6px 10px;
      font-size: 14px;
    }
  </style>
</head>
<body>

  <h1>Tasks</h1>

  <!-- Form handles both Enter key and Button click -->
  <form id="todo-form">
    <input type="text" id="todo-input" placeholder="Add a new task..." required />
    <button type="submit" id="add-btn">Add</button>
  </form>

  <ul id="todo-list"></ul>

  <script>
    // 1. SELECT DOM ELEMENTS
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // 2. INITIALIZE STATE FROM LOCALSTORAGE
    // JSON.parse converts the stored string back into a JS array
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // 3. SAVE & RENDER PIPELINE
    function saveAndRender() {
      // localStorage only stores strings, so we serialize the array
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    }

    function renderTodos() {
      // Clear current list before rebuilding
      todoList.innerHTML = '';

      todos.forEach((todo) => {
        // Create elements programmatically (safe against XSS)
        const li = document.createElement('li');
        li.dataset.id = todo.id; // Store ID in a data-* attribute
        if (todo.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text; // textContent prevents HTML injection

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        li.append(span, deleteBtn);
        todoList.appendChild(li);
      });
    }

    // 4. EVENT LISTENERS

    // Add Task (Form Submit)
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload on submit

      const text = todoInput.value.trim();
      if (!text) return;

      todos.push({
        id: Date.now(), // Unique timestamp ID
        text: text,
        completed: false
      });

      todoInput.value = '';
      saveAndRender();
    });

    // Complete & Delete Tasks (Event Delegation on the parent <ul>)
    todoList.addEventListener('click', (e) => {
      // Find the closest parent <li> to get the task ID
      const li = e.target.closest('li');
      if (!li) return;

      const id = Number(li.dataset.id);

      // Check if Delete button was clicked
      if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter((todo) => todo.id !== id);
        saveAndRender();
      } 
      // Check if Task text was clicked
      else if (e.target.classList.contains('todo-text')) {
        todos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveAndRender();
      }
    });

    // 5. INITIAL RENDER ON PAGE LOAD
    renderTodos();
  </script>
</body>
</html>
