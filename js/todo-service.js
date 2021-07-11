'use strict';

var gFilterBy = 'all';
var gTodos;
var gSortBy = 'time'

_createTodos();

function getTodosForDisplay() {
    if (gFilterBy === 'all') return getTodosSortedDisplay(gTodos);
    var todos = gTodos.filter(function (todo) {
        return (todo.isDone && gFilterBy === 'done') ||
            (!todo.isDone && gFilterBy === 'active')
    })
    
    return getTodosSortedDisplay(todos);
}
function getTodosSortedDisplay(todos){
    switch(gSortBy){
        case 'txt':
            todos = sortByText(todos)
            break;
        case 'time':
            todos = sortByTime(todos)
            break;
        case 'priority':
            todos = sortByPriority(todos)
            break;
        default:  
            todos = sortByTime(todos)
            break;
    }
    return todos
}

function removeTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    // ES6 Style:
    // var todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1);
    _saveTodos();
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone
    _saveTodos();

}

function addTodo(txt, priority) {
    var todo = _createTodo(txt, priority)
    gTodos.unshift(todo)
    _saveTodos();
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy){
    gSortBy = sortBy
}

function sortByTime(todos){
    return todos.sort(function (a,b){
        return b.createdAt - a.createdAt
    })

}

function sortByText(todos){
    return todos.sort(function (a,b){
        if(a.txt.toUpperCase() > b.txt.toUpperCase()) return 1
        return -1
    })
}

function sortByPriority(todos){
    return todos.sort(function (a,b){
        return a.importance - b.importance
    })
}

function getTodosCount() {
    return gTodos.length
}
function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

function getPriorityName(num){
    switch(num){
        case 1: return "High"
        case 2: return "Med"
        case 3: return "Low"
    }
}

// COnventions: Those are private functions that are intended to use only in this file
function _createTodos() {

    var todos = loadFromStorage('myTodos')

    if (!todos || todos.length === 0) {
        var txts = ['Learn HTML', 'Master CSS', 'Love Javascript']
        var todos = txts.map(function(txt){
            return _createTodo(txt)
        })
        gTodos = todos;
        _saveTodos();
    }
    gTodos = todos;
}


function _createTodo(txt, priority = 1) {
    var todo = {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: +priority
    }
    return todo;
}

function _saveTodos() {
    saveToStorage('myTodos', gTodos)
}