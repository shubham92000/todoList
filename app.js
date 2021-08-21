const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
    //dom load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task
    form.addEventListener('submit' , addTask);
    //remove task
    taskList.addEventListener('click' , removeTask);
    //clear task event
    clearBtn.addEventListener('click' , clearTasks);
    //filter
    filter.addEventListener('keyup', filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        //create link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">clear</i>';
        // link.innerHTML = '<i class="material-icons"></i>';
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    else{
        //create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));

        //create link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">clear</i>';
        // link.innerHTML = '<i class="material-icons"></i>';
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

        // console.log(li);
        // store in ls
        storeTasksInLocalStorage(taskInput.value);
        //clear input
        taskInput.value = '';
    }
    e.preventDefault();
}

function storeTasksInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are u sure?')){
            e.target.parentElement.parentElement.remove();

            //remove from ls
            let str = e.target.parentElement.parentElement.textContent;
            
            removeTaskFromLocalStorage(str.slice(0,str.length-5));
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function clearTasks(e){
    // taskList.remove();
    while(taskList.firstChild){
        removeTaskFromLocalStorage(taskList.firstChild.textContent.slice(0,-5));
        taskList.removeChild(taskList.firstChild);
    }
    // localStorage.clear();
    // console.log(taskList);
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    console.log(e.target.value.toLowerCase());
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
    // console.log(text);
}