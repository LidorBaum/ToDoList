'use strict'
var currFilter

function onInit() {
    localStorage.clear() //TO DELETE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('Init');
    renderTodos();
}

function onTodoToggle(elTodo, todoId) {
    toggleTodo(todoId)
    renderTodos()
    // elTodo.classList.toggle('done')
}

function renderTodos() {
    var strHTML = ''
    var todos = getTodosForDisplay();
    if(todos.length === 0 ){
        document.querySelector(".empty-list").innerText = `There are no ${currFilter} todos`
        document.querySelector(".empty-list").style = "display: block;"
    }
    else{
    document.querySelector(".empty-list").style = "display: none;"
    }
    todos.forEach(function (todo) {
        var className = (todo.isDone) ? 'done' : ''
        strHTML += `
        <li onclick="onTodoToggle(this, '${todo.id}')" class="${className}">
            ${todo.txt}
            <span class= "importance">|| Priority: ${getPriorityName(todo.importance)}
            <span class="timestamp">|| @ ${makeDate(todo.createdAt)}</span>
            <button onclick="onTodoRemove(event, '${todo.id}')">x</button>
        </li>
        `;
    })

    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTML;

    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveCount();
}

function onTodoRemove(ev, todoId) {
    ev.stopPropagation();
    if(!confirm("ARE YOU SURE YOU WANT TO REMOVE?")) return
    removeTodo(todoId);
    renderTodos();
}



function onAddTodo() {
    var elTodoTxt = document.querySelector('.todo-txt');
    var elTodoPriority = document.querySelector('.todo-priority')
    var todoPriority = elTodoPriority.value
    // console.log(todoPriority)
    var todoTxt = elTodoTxt.value;
    if(!todoPriority || !todoTxt) return
    addTodo(todoTxt, todoPriority);
    renderTodos();
    elTodoTxt.value = ''
    elTodoPriority.value = ''
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    currFilter = filterBy
    renderTodos();
}

function onSetSort(sortBy){
    setSort(sortBy)
    renderTodos()
}