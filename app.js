const form = document.querySelector('.task-card');
const taskInput = document.querySelector('#task');
const taskButton = document.querySelector('.task-button');
const addButton = document.querySelector('.add-task');
const cancelButton = document.querySelector('.remove-task-card');
const clearButton = document.querySelector('.clear-tasks');
const ul = document.querySelector('.task-collection');
const filter = document.querySelector('#filter');
const card = document.querySelector('.task-item');

loadAllEventsListeners();

function loadAllEventsListeners(){
    // Load content
    document.addEventListener('DOMContentLoaded', getTasks);
    // Display task card
    taskButton.addEventListener('click', taskCard);
    // Remove task card
    cancelButton.addEventListener('click', removeTaskCard);
    // Add tasks
    form.addEventListener('submit', addTask);
    // Remove task
    ul.addEventListener('click', removeTask);
    // Clear Tasks
    clearButton.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
    // Window click
    window.addEventListener('click', onWindowClick);
}

// Display task card
function taskCard(){
    form.style.display = 'block';
}

// Remove task card
function removeTaskCard(){
    form.style.display = 'none';
}

function onWindowClick(e){
    if(e.target == ul){
        removeTaskCard();
    }
}

// Get tasks from localStorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li
    const li = document.createElement('li');
    // Add class
    li.className = 'task-item';
    // Create span
    const span = document.createElement('span');
    // Add text content
    span.appendChild(document.createTextNode(task));
    // append span to li
    li.appendChild(span);
    // Create link
    const link = document.createElement('a');
    // Add class
    link.className = 'task-icon remove-task'
    // Add attribute
    link.setAttribute('href', '#');
    // add link content
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    ul.appendChild(li);
    });
}

// Add tasks
function addTask(e){
    if(taskInput.value == ''){
        alert('Add a task')
    }

    // Create li
    const li = document.createElement('li');
    // Add class
    li.className = 'task-item';
    // Create span
    const span = document.createElement('span');
    // Add text content
    span.appendChild(document.createTextNode(taskInput.value));
    // append span to li
    li.appendChild(span);
    // Create link
    const link = document.createElement('a');
    // Add class
    link.className = 'task-icon remove-task'
    // Add attribute
    link.setAttribute('href', '#');
    // add link content
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    ul.appendChild(li);

    // Store in Local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
    

    e.preventDefault();
}

// Local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('remove-task')){
        if(confirm('Are you sure you want to remove this task?')){
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove tasks from localStorage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.firstChild.textContent == task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(){
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }

    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.task-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    })
}