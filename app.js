// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listener
loadEventListener();

function loadEventListener(){
    // Add task
    document.addEventListener('submit', addTask);
    // Remove task
    document.addEventListener('click', removeTask);
    // Clear task
    clearBtn.addEventListener('click', clearTasks);
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Please input the task');
    } else {
        // Create an element li
        const li = document.createElement('li');
        // Create a class name for li
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create a delete link
        const link = document.createElement('a');
        // Create a class name for the delete link
        link.className = 'delete-item secondary-content';
        // Create delete icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);

        taskInput.value = '';    

        e.preventDefault();
    }
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        console.log(e.target.parentElement.parentElement.remove());
    }
}

function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}