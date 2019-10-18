const formTask = document.querySelector('#task-form');
const inputTask = document.querySelector('#task');
const listTask = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearbtn = document.querySelector('.clear-tasks');

// Load all event listener
loadAllEventListener();

function loadAllEventListener(){
    // Get tasks
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task
    formTask.addEventListener('submit', addTask);
    // Remove task
    listTask.addEventListener('click', removeTask);
    // Filter task
    filter.addEventListener('keyup', filterTask);
    // Clear task
    clearbtn.addEventListener('click', clearTask);
}

// Get tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.append(task);
        const delLink = document.createElement('a');
        delLink.setAttribute('href', '#');
        delLink.className = 'delete-item secondary-content';
        delLink.innerHTML = '<i class="fa fa-remove"></i>';
        li.append(delLink);
        listTask.append(li);
    });
}

// Add task
function addTask(e){
    if(inputTask.value === ''){
        alert('Task Empty!');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.append(inputTask.value);
        const delLink = document.createElement('a');
        delLink.setAttribute('href', '#');
        delLink.className = 'delete-item secondary-content';
        delLink.innerHTML = '<i class="fa fa-remove"></i>';
        li.append(delLink);
        listTask.append(li);

        // store to LS
        storeToLS(inputTask.value);

        inputTask.value = '';
        e.preventDefault();
    }
}

// Store to LS
function storeToLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }

    // Remove from LS
    removeFromLS(e.target.parentElement.parentElement);
}

// Remove from LS
function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Clear task
function clearTask(){
    while(listTask.firstChild){
        listTask.removeChild(listTask.firstChild);
    }

    // clear from LS
    clearFromLS();
}

function clearFromLS(){
    localStorage.clear();
}