// DOM Element Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksContainer = document.getElementById('tasksContainer');
const filterButtons = document.querySelectorAll('.filter-btn');

// App State
let tasks = [
  { id: 1, text: "Learn JavaScript arrays", status: "waiting" },
  { id: 2, text: "Build a Bootstrap layout", status: "completed" }
];
let currentFilter = 'all';

// Main Render Logic
function renderTasks() {
  tasksContainer.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'completed') return task.status === 'completed';
    if (currentFilter === 'waiting') return task.status === 'waiting';
    return true;
  });

  if (filteredTasks.length === 0) {
    tasksContainer.innerHTML = `<p style="text-align:center; color:#888;">No tasks found here 📭</p>`;
    return;
  }

  filteredTasks.forEach(task => {
    const isCompleted = task.status === 'completed';
    const card = document.createElement('div');
    card.className = `card ${isCompleted ? 'completed' : ''}`;
    
    card.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="card-actions">
        <!-- Using data-attributes for clean Event Delegation -->
        <button class="action-btn status-btn" data-action="toggle" data-id="${task.id}">
          ${isCompleted ? 'Wait ⏳' : 'Done ✅'}
        </button>
        <button class="action-btn delete-btn" data-action="delete" data-id="${task.id}">Delete 🗑️</button>
      </div>
    `;
    tasksContainer.appendChild(card);
  });
}

// Add New Task
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return alert('Please enter a task name!');

  tasks.push({ id: Date.now(), text, status: 'waiting' });
  taskInput.value = '';
  renderTasks();
});

// Event Delegation for Update/Delete Actions
tasksContainer.addEventListener('click', (e) => {
  const target = e.target.closest('button');
  if (!target) return;

  const id = Number(target.dataset.id);
  const action = target.dataset.action;

  if (action === 'toggle') {
    tasks = tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'waiting' : 'completed' } : t);
  } else if (action === 'delete') {
    tasks = tasks.filter(t => t.id !== id);
  }

  renderTasks();
});

// Bonus Filter Switcher
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.getAttribute('data-filter');
    renderTasks();
  });
});

// Initial Load execution
renderTasks();
