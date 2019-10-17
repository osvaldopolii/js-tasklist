const inputTask = document.querySelector('#task');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listener
loadAllEventListener();

function loadAllEventListener(){
    // Get task
    document.addEventListener('DOMContentLoaded', getTask);
    // Add task
    form.addEventListener('submit', addTask);
    // Filter task
    filter.addEventListener('keyup', filterTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear tasks
    clearBtn.addEventListener('click', clearTask);
}

function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const delLink = document.createElement('a');
        delLink.setAttribute('href', '#');
        delLink.className = 'delete-item secondary-content';
        delLink.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(delLink);
        taskList.appendChild(li);
    });
}

function addTask(e){
    if(inputTask.value === ''){
        alert('Task should\'n be empty');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(inputTask.value));
        const delLink = document.createElement('a');
        delLink.setAttribute('href', '#');
        delLink.className = 'delete-item secondary-content';
        delLink.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(delLink);
        taskList.appendChild(li);

        storeToLS(inputTask.value);
        inputTask.value = '';

        e.preventDefault();
        
    }
}

function storeToLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));;
}

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

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }

    // remove from LS
    removeFromLS(e.target.parentElement.parentElement);
}

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

function clearTask(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearFromLS();
}

function clearFromLS(){
    localStorage.clear();
}
